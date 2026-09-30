const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const selfsigned = require('selfsigned');

const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const HTTP_PORT = process.env.HTTP_PORT || 3042;

const CERT_PATH = path.join(__dirname, 'cert.pem');
const KEY_PATH = path.join(__dirname, 'key.pem');

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const localIp = getLocalIp();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Request Handler for Content Delivery
function handleRequest(req, res, isSecure = false) {
  let reqPath = req.url.split('?')[0];

  // API Endpoint for Network & Mobile Access Info
  if (reqPath === '/api/network-info') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({
      ip: localIp,
      httpPort: HTTP_PORT,
      httpsPort: HTTPS_PORT,
      httpUrl: `http://${localIp}:${HTTP_PORT}/`,
      httpsUrl: `https://${localIp}:${HTTPS_PORT}/`
    }));
    return;
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      const headers = {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      };

      if (isSecure) {
        headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
      }

      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    }
  });
}

async function startServer() {
  // Generate or Regenerate SSL Certificates with SAN for both localhost and Local IP
  const shouldRegen = !fs.existsSync(CERT_PATH) || !fs.existsSync(KEY_PATH);

  if (shouldRegen) {
    console.log(`Generating SSL/TLS certificates for localhost and IP ${localIp}...`);
    const attrs = [
      { name: 'commonName', value: localIp },
      { name: 'countryName', value: 'IN' },
      { shortName: 'ST', value: 'Odisha' },
      { name: 'localityName', value: 'Bhubaneswar' },
      { name: 'organizationName', value: 'Smart Campus AI Technologies' }
    ];

    const pems = await selfsigned.generate(attrs, {
      days: 365,
      keySize: 2048,
      algorithm: 'sha256',
      extensions: [
        { name: 'basicConstraints', cA: true },
        {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        },
        {
          name: 'subjectAltName',
          altNames: [
            { type: 2, value: 'localhost' },
            { type: 7, ip: '127.0.0.1' },
            { type: 7, ip: localIp }
          ]
        }
      ]
    });

    fs.writeFileSync(CERT_PATH, pems.cert, 'utf-8');
    fs.writeFileSync(KEY_PATH, pems.private, 'utf-8');
    console.log('SSL Certificates generated successfully.');
  }

  const sslOptions = {
    key: fs.readFileSync(KEY_PATH),
    cert: fs.readFileSync(CERT_PATH)
  };

  // 1. Secure HTTPS Server (Encrypted TLS on port 3443)
  const httpsServer = https.createServer(sslOptions, (req, res) => handleRequest(req, res, true));
  httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`🔒 Smart Campus SECURE HTTPS Server running:`);
    console.log(`   ➜ Local:   https://localhost:${HTTPS_PORT}/`);
    console.log(`   ➜ Android: https://${localIp}:${HTTPS_PORT}/`);
  });

  // 2. HTTP Server (Direct preview on port 3042 - seamless for Android without cert warnings)
  const httpServer = http.createServer((req, res) => handleRequest(req, res, false));
  httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log(`📱 Smart Campus HTTP Mobile Server running:`);
    console.log(`   ➜ Local:   http://localhost:${HTTP_PORT}/`);
    console.log(`   ➜ Android: http://${localIp}:${HTTP_PORT}/`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
