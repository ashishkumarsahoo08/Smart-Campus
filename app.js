/**
 * SMART CAMPUS - UNIFIED CLIENT ENGINE (V3)
 * Full-featured campus management platform replacing disconnected systems:
 * - Online Faculty Attendance Register with live roll-call table ([P], [A], [L] toggles)
 * - Student Subject-wise & Overall Attendance Hub with safety margin calculations
 * - Interactive Timetable with day switcher & room swap broadcasting
 * - Digital Gate Pass workflow with scannable QR & parent notifications
 * - Hostel Complaints & Grievance tracker with 24h SLA and recurring issue hotspots
 * - Mess & Dining services with 4-meal cycle, 5-star ratings, and rebate calculator
 * - Unified Fee Desk with official verified e-receipts
 * - Parent SMS gateway simulation for low-bandwidth / low-end mobile accessibility
 * - Low-Data Mode toggle for 2G/3G low-bandwidth connections
 * - Comprehensive Activity Audit Trail with Day, Date, Time & Role logging
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= Helper: Timestamp Generator =================
  function getCurrentTimeInfo() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[now.getDay()],
      date: `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      iso: now.toISOString(),
      displayFull: `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };
  }

  // ================= Default V3 Seed Database =================
  const defaultDatabase = {
    users: {
      student1: {
        id: 'student1',
        loginId: '2501297031',
        role: 'student',
        name: 'Ashish Kumar Sahoo',
        Regd_no: '2501297031',
        dept: 'Computer Science & Engineering',
        sem: '3rd Semester',
        attendance: 90,
        attendanceAttended: 138,
        attendanceSessionsTotal: 154,
        avatar: '👨‍🎓',
        parentId: 'parent1',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026',
        subjects: [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 35, total: 38, percentage: 92 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 30, total: 34, percentage: 88 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 41, total: 48, percentage: 85 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 30, total: 34, percentage: 88 }
        ]
      },
      student2: {
        id: 'student2',
        loginId: '2501297070',
        role: 'student',
        name: 'Debasish Patra',
        Regd_no: '2501297070',
        dept: 'Computer Science & Engineering',
        sem: '3rd Semester',
        attendance: 94,
        attendanceAttended: 160,
        attendanceSessionsTotal: 170,
        avatar: '👨‍🎓',
        parentId: 'parent2',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026',
        subjects: [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 26, total: 38, percentage: 68 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 26, total: 34, percentage: 76 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 36, total: 48, percentage: 75 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 26, total: 34, percentage: 76 }
        ]
      },
      student3: {
        id: 'student3',
        loginId: '2501297098',
        role: 'student',
        name: 'Ipsita Moharana',
        Regd_no: '2501297098',
        dept: 'Computer Science & Engineering',
        sem: '3rd Semester',
        attendance: 93,
        attendanceAttended: 146,
        attendanceSessionsTotal: 157,
        avatar: '👩‍🎓',
        parentId: 'parent1',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026',
        subjects: [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 37, total: 38, percentage: 97 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 32, total: 34, percentage: 94 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 45, total: 48, percentage: 94 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 31, total: 34, percentage: 91 }
        ]
      },
      student4: {
        id: 'student4',
        loginId: '2501297258',
        role: 'student',
        name: 'Sruti Rekha Sahu',
        Regd_no: '2501297258',
        dept: 'Computer Science & Engineering',
        sem: '3rd Semester',
        attendance: 73.22,
        attendanceAttended: 134,
        attendanceSessionsTotal: 183,
        avatar: '👩‍🎓',
        parentId: 'parent1',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026',
        subjects: [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 37, total: 38, percentage: 97 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 32, total: 34, percentage: 94 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 45, total: 48, percentage: 94 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 31, total: 34, percentage: 91 }
        ]
      },
      student5: {
        id: 'student5',
        loginId: '2501297068',
        role: 'student',
        name: 'Debasish Sahani',
        Regd_no: '2501297068',
        dept: 'Computer Science & Engineering',
        sem: '3rd Semester',
        attendance: 87.92,
        attendanceAttended: 131,
        attendanceSessionsTotal: 149,
        avatar: '👨‍🎓',
        parentId: 'parent2',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026',
        subjects: [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 26, total: 38, percentage: 68 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 26, total: 34, percentage: 76 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 36, total: 48, percentage: 75 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 26, total: 34, percentage: 76 }
        ]
      },
      student6: {
        id: 'student6',
        loginId: '2501297121',
        role: 'student',
        name: 'Kishore Gourav Ghosh',
        Regd_no: '2501297121',
        dept: 'Computer Science & Engineering',
        sem: '3rd Semester',
        attendance: 76.92,
        attendanceAttended: 120,
        attendanceSessionsTotal: 156,
        avatar: '👨‍🎓',
        parentId: 'parent2',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026',
        subjects: [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 26, total: 38, percentage: 68 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 26, total: 34, percentage: 76 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 36, total: 48, percentage: 75 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 26, total: 34, percentage: 76 }
        ]
      },
      faculty1: {
        id: 'faculty1',
        loginId: 'FAC-042',
        role: 'faculty',
        name: 'Prof. A.K. Sharma',
        staffId: 'FAC-042',
        dept: 'Computer Science & Engineering',
        designation: 'Associate Professor & HOD',
        avatar: '👩‍🏫',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '15 Jul 2026'
      },
      faculty2: {
        id: 'faculty2',
        loginId: 'FAC-018',
        role: 'faculty',
        name: 'Dr. Priya Patel',
        staffId: 'FAC-018',
        dept: 'Electronics & Communication',
        designation: 'Associate Professor',
        avatar: '👩‍🏫',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '15 Jul 2026'
      },
      admin: {
        id: 'admin',
        loginId: 'ADM-001',
        role: 'admin',
        name: 'Dr. R.N. Sen',
        staffId: 'ADM-001',
        dept: 'Central Academic Administration',
        designation: 'Registrar',
        avatar: '👨‍💼',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Executive Council / Board of Governors',
        createdAt: '01 Jun 2026'
      },
      parent1: {
        id: 'parent1',
        loginId: 'PAR-082',
        role: 'parent',
        name: 'Mr. N. Mohapatra',
        wardId: 'student1',
        wardName: 'Satyajit Mohapatra',
        avatar: '👪',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026'
      },
      parent2: {
        id: 'parent2',
        loginId: 'PAR-015',
        role: 'parent',
        name: 'Mrs. S. Verma',
        wardId: 'student2',
        wardName: 'Rahul Verma',
        avatar: '👪',
        password: 'campus123',
        passwordChanged: false,
        createdBy: 'Administrator (Dr. R.N. Sen)',
        createdAt: '28 Aug 2026'
      }
    },
    currentUserId: null,
    attendanceSessions: [
      {
        id: 'ATT-S101',
        date: '28 Sep 2026',
        time: '10:00 AM',
        subjectCode: 'CS501',
        subjectName: 'AI & Machine Learning',
        topic: 'Convolutional Neural Networks & Backpropagation',
        faculty: 'Prof. A.K. Sharma',
        batch: 'CSE 3rd Sem - Sec A',
        records: { student1: 'P', student2: 'A', student3: 'P' }
      },
      {
        id: 'ATT-S100',
        date: '27 Sep 2026',
        time: '11:15 AM',
        subjectCode: 'CS503',
        subjectName: 'Data Structures & Algorithms',
        topic: 'Graph Traversal Algorithms (BFS & DFS)',
        faculty: 'Prof. A.K. Sharma',
        batch: 'CSE 3rd Sem - Sec A',
        records: { student1: 'P', student2: 'P', student3: 'P' }
      },
      {
        id: 'ATT-S099',
        date: '27 Sep 2026',
        time: '09:00 AM',
        subjectCode: 'CS502',
        subjectName: 'Cloud Computing & DevOps',
        topic: 'Kubernetes Container Orchestration',
        faculty: 'Dr. Priya Patel',
        batch: 'CSE 3rd Sem - Sec A',
        records: { student1: 'P', student2: 'A', student3: 'P' }
      }
    ],
    timetableData: {
      Monday: [
        { time: '09:00 AM - 10:00 AM', code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', venue: 'Lecture Hall 101', status: 'On Schedule' },
        { time: '10:00 AM - 11:00 AM', code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', venue: 'LH-204', status: 'On Schedule' },
        { time: '11:15 AM - 01:15 PM', code: 'CS501-L', name: 'AI & Machine Learning Lab', faculty: 'Prof. A.K. Sharma / TA', venue: 'Lab 304', status: 'On Schedule' },
        { time: '02:00 PM - 03:00 PM', code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', venue: 'LH-102', status: 'On Schedule' }
      ],
      Tuesday: [
        { time: '09:00 AM - 10:00 AM', code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', venue: 'LH-101', status: 'On Schedule' },
        { time: '10:00 AM - 11:00 AM', code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', venue: 'LH-101', status: 'On Schedule' },
        { time: '11:15 AM - 12:15 PM', code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', venue: 'LH-102', status: 'On Schedule' },
        { time: '02:00 PM - 04:00 PM', code: 'CS502-L', name: 'Cloud & DevOps Lab', faculty: 'Dr. Priya Patel', venue: 'Cloud Lab 2', status: 'On Schedule' }
      ],
      Wednesday: [
        { time: '09:00 AM - 10:00 AM', code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', venue: 'LH-204', status: 'On Schedule' },
        { time: '10:00 AM - 11:00 AM', code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', venue: 'LH-101', status: 'On Schedule' },
        { time: '11:15 AM - 12:15 PM', code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', venue: 'LH-101', status: 'Room Swap: LH-302' },
        { time: '02:00 PM - 03:00 PM', code: 'OE501', name: 'Open Elective / Entrepreneurship', faculty: 'Dr. V. Rao', venue: 'Auditorium Wing', status: 'On Schedule' }
      ],
      Thursday: [
        { time: '09:00 AM - 10:00 AM', code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', venue: 'LH-102', status: 'On Schedule' },
        { time: '10:00 AM - 11:00 AM', code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', venue: 'LH-204', status: 'On Schedule' },
        { time: '11:15 AM - 01:15 PM', code: 'CS504-L', name: 'DBMS Lab', faculty: 'Prof. S. Mohanty', venue: 'Lab 102', status: 'On Schedule' },
        { time: '02:00 PM - 03:00 PM', code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', venue: 'LH-101', status: 'On Schedule' }
      ],
      Friday: [
        { time: '09:00 AM - 10:00 AM', code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', venue: 'LH-101', status: 'On Schedule' },
        { time: '10:00 AM - 11:00 AM', code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', venue: 'LH-101', status: 'On Schedule' },
        { time: '11:15 AM - 12:15 PM', code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', venue: 'LH-102', status: 'On Schedule' },
        { time: '02:00 PM - 04:00 PM', code: 'PRJ501', name: 'Capstone Minor Project', faculty: 'Project Guide', venue: 'Innovation Lab', status: 'On Schedule' }
      ],
      Saturday: [
        { time: '09:30 AM - 11:30 AM', code: 'TUT501', name: 'Remedial & GATE Coaching', faculty: 'Prof. A.K. Sharma', venue: 'LH-101', status: 'Extra Class' },
        { time: '11:45 AM - 01:15 PM', code: 'SEMINAR', name: 'Industry Expert Interaction', faculty: 'External Speaker', venue: 'Main Auditorium', status: 'On Schedule' }
      ]
    },
    smsLogs: [
      {
        id: 'SMS-4402',
        time: '11:46 AM',
        date: '27 Sep 2026',
        to: '+91 98******10 (Mr. N. Mohapatra)',
        type: 'Gate Pass Approved',
        message: 'Smart Campus: Gate Outing Pass #GP-8834 approved for Satyajit Mohapatra (Medical Outing: Apollo Clinic). Valid 03:30 PM - 07:30 PM today.'
      },
      {
        id: 'SMS-4390',
        time: '09:30 AM',
        date: '26 Sep 2026',
        to: '+91 98******10 (Mr. N. Mohapatra)',
        type: 'Attendance Notice',
        message: 'Smart Campus: Weekly Attendance Alert for Satyajit Mohapatra: Overall 88% (Good Standing). Safe from shortage threshold.'
      },
      {
        id: 'SMS-4385',
        time: '04:15 PM',
        date: '25 Sep 2026',
        to: '+91 97******22 (Mrs. S. Verma)',
        type: 'Shortage Warning',
        message: 'URGENT - Smart Campus: Rahul Verma attendance has dropped to 74% in Sem 5. Minimum 75% required for exam hall ticket. Please counsel ward.'
      }
    ],
    gatePasses: [
      {
        id: 'GP-8834',
        studentId: 'student1',
        studentName: 'Ashish Kumar Sahoo',
        Regd_no: '2501297031',
        category: 'Medical Emergency',
        reason: 'Visiting Apollo Medical Clinic for routine checkup',
        outTime: '15:30',
        inTime: '19:30',
        status: 'Approved',
        appliedTimeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '11:15 AM' },
        reviewedBy: 'Prof. A.K. Sharma (HOD CSE)',
        reviewedTimeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '11:45 AM' }
      },
      {
        id: 'GP-8812',
        studentId: 'student2',
        studentName: 'Debasish Patra',
        Regd_no: '2501297070',
        category: 'Lab Equipment',
        reason: 'NVIDIA Jetson Nano kit for AI semester project',
        outTime: '14:00',
        inTime: '18:00',
        status: 'Pending',
        appliedTimeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '02:20 PM' },
        reviewedBy: 'Awaiting Faculty Endorsement',
        reviewedTimeInfo: null
      },
      {
        id: 'GP-8790',
        studentId: 'student3',
        studentName: 'Ipsita Moharana',
        Regd_no: '2501297098',
        category: 'Bonafide Cert',
        reason: 'State Merit Scholarship Application verification',
        outTime: '10:00',
        inTime: '16:00',
        status: 'Pending',
        appliedTimeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '09:00 AM' },
        reviewedBy: 'Awaiting Faculty Endorsement',
        reviewedTimeInfo: null
      }
    ],
    activityHistory: [
      {
        id: 'ACT-1005',
        actionType: 'ATTENDANCE',
        badgeColor: 'attendance',
        actorRole: 'Faculty',
        actorName: 'Prof. A.K. Sharma',
        description: 'Conducted live lecture attendance for CS501: AI & Machine Learning (CNNs & Backpropagation). 2 Present, 1 Absent. Synced to institutional database.',
        timeInfo: { day: 'Monday', date: '28 Sep 2026', time: '10:02 AM' }
      },
      {
        id: 'ACT-1004',
        actionType: 'GATE_PASS',
        badgeColor: 'gate',
        actorRole: 'Faculty',
        actorName: 'Prof. A.K. Sharma',
        description: 'Approved Gate Pass #GP-8834 for student Satyajit Mohapatra (Destination: Apollo Clinic). Valid 03:30 PM - 07:30 PM.',
        timeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '11:45 AM' }
      },
      {
        id: 'ACT-1003',
        actionType: 'GATE_PASS',
        badgeColor: 'gate',
        actorRole: 'Student',
        actorName: 'Satyajit Mohapatra',
        description: 'Applied for Medical Outing Gate Pass to Apollo Clinic for medical checkup.',
        timeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '11:15 AM' }
      },
      {
        id: 'ACT-1002',
        actionType: 'ATTENDANCE',
        badgeColor: 'attendance',
        actorRole: 'Faculty',
        actorName: 'Prof. A.K. Sharma',
        description: 'Recorded batch lecture attendance for CSE Batch A (58 Present, 2 Absent). Synced to institutional records.',
        timeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '10:05 AM' }
      },
      {
        id: 'ACT-1001',
        actionType: 'LOGIN',
        badgeColor: 'login',
        actorRole: 'Student',
        actorName: 'Satyajit Mohapatra',
        description: 'Signed in securely to Smart Campus Portal from authorized device.',
        timeInfo: { day: 'Sunday', date: '27 Sep 2026', time: '09:30 AM' }
      }
    ],
    feedbackList: [
      {
        id: 'FB-101',
        type: 'FACULTY',
        category: 'Prof. A.K. Sharma | CS501 AI & Machine Learning',
        targetName: 'Prof. A.K. Sharma',
        courseCode: 'CS501',
        studentId: 'student1',
        studentDisplay: 'Anonymous Student (CSE Sem 5)',
        isAnonymous: true,
        rating: 5.0,
        ratingsDetail: { clarity: 5, doubts: 5, labs: 5, fairness: 5 },
        comments: 'Prof. Sharma explains Convolutional Neural Networks with live code demonstrations in Python, which makes theoretical concepts extremely clear and practical.',
        date: '28 Sep 2026',
        time: '11:30 AM',
        status: 'Verified by Dean Academic'
      },
      {
        id: 'FB-100',
        type: 'FACULTY',
        category: 'Prof. A.K. Sharma | CS503 Data Structures',
        targetName: 'Prof. A.K. Sharma',
        courseCode: 'CS503',
        studentId: 'student2',
        studentDisplay: 'Anonymous Student (CSE Sem 5)',
        isAnonymous: true,
        rating: 4.5,
        ratingsDetail: { clarity: 4, doubts: 5, labs: 4, fairness: 5 },
        comments: 'Great interactive lectures on Graph Traversal algorithms. Would be wonderful to have an extra 30-minute tutorial session on dynamic programming before midterms.',
        date: '27 Sep 2026',
        time: '04:15 PM',
        status: 'Verified by Dean Academic'
      },
      {
        id: 'FB-099',
        type: 'CAMPUS',
        category: 'Campus Wi-Fi & IT Network',
        targetName: 'Campus Network & Wi-Fi',
        studentId: 'student1',
        studentDisplay: 'Ashish Kumar Sahoo (2501297031)',
        isAnonymous: false,
        rating: 3.0,
        location: 'Hostel Block B (3rd Floor Lounge)',
        isUrgent: true,
        comments: 'High-speed fiber connectivity drops frequently during 8:00 PM - 10:00 PM in the 3rd floor lounge. Need additional access points.',
        date: '26 Sep 2026',
        time: '09:20 PM',
        status: 'Assigned to IT Infrastructure'
      },
      {
        id: 'FB-098',
        type: 'CAMPUS',
        category: 'Central Library & Silent Study Zones',
        targetName: 'Central University Library',
        studentId: 'student3',
        studentDisplay: 'Anonymous Student (CSE Sem 3)',
        isAnonymous: true,
        rating: 5.0,
        location: 'Central Library 2nd Floor (Digital Section)',
        isUrgent: false,
        comments: 'The newly introduced high-performance workstations for IEEE and Springer digital research access are phenomenal. Air conditioning and silent ambience are well maintained.',
        date: '25 Sep 2026',
        time: '02:40 PM',
        status: 'Acknowledged by Chief Librarian'
      }
    ]
  };

  // ================= State Initialization with Persistent Storage =================
  let db = null;
  const DB_STORAGE_KEY = 'SC_CAMPUS_DATABASE_V3';

  try {
    const saved = localStorage.getItem(DB_STORAGE_KEY);
    if (saved) {
      db = JSON.parse(saved);
      if (!db.users || !db.attendanceSessions || !db.gatePasses || !db.activityHistory) {
        db = defaultDatabase;
      }
      if (!db.feedbackList) {
        db.feedbackList = defaultDatabase.feedbackList;
      }
    } else {
      db = defaultDatabase;
    }
  } catch (err) {
    db = defaultDatabase;
  }

  // Ensure all existing cached user accounts have institutional credentials
  if (db && db.users) {
    Object.keys(db.users).forEach(uid => {
      const u = db.users[uid];
      if (!u.password) u.password = 'campus123';
      if (!u.loginId) u.loginId = u.roll || u.staffId || u.id;
      if (u.passwordChanged === undefined) u.passwordChanged = false;
      if (!u.createdBy) u.createdBy = 'Administrator (Dr. R.N. Sen)';
      if (!u.createdAt) u.createdAt = '28 Aug 2026';
    });
  }

  // Active Session handling:
  // Show login portal first unless session exists
  const activeSessionId = sessionStorage.getItem('SC_ACTIVE_SESSION');
  if (activeSessionId && db.users && db.users[activeSessionId]) {
    db.currentUserId = activeSessionId;
  } else {
    db.currentUserId = null;
  }

  function persistDb() {
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.warn('Storage quota or storage disabled:', e);
    }
    updateHistoryCountBadge();
  }

  // ================= Theme System =================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon') : null;
  let currentTheme = localStorage.getItem('sc_theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
    }
    localStorage.setItem('sc_theme', theme);
  }
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      showToast(`Switched to ${currentTheme} theme`, 'info');
    });
  }

  // ================= Low-Data Mode Engine =================
  const lowDataToggleBtn = document.getElementById('lowDataToggleBtn');
  const lowDataBanner = document.getElementById('lowDataBanner');
  let isLowDataMode = localStorage.getItem('sc_low_data') === 'true';

  function applyLowDataMode(enabled) {
    if (enabled) {
      document.body.classList.add('low-data-mode');
      if (lowDataBanner) lowDataBanner.style.display = 'block';
      if (lowDataToggleBtn) {
        lowDataToggleBtn.classList.add('btn-primary');
        lowDataToggleBtn.classList.remove('btn-outline');
        lowDataToggleBtn.textContent = '⚡ Low-Data: ON';
      }
    } else {
      document.body.classList.remove('low-data-mode');
      if (lowDataBanner) lowDataBanner.style.display = 'none';
      if (lowDataToggleBtn) {
        lowDataToggleBtn.classList.remove('btn-primary');
        lowDataToggleBtn.classList.add('btn-outline');
        lowDataToggleBtn.textContent = '⚡ Low-Data';
      }
    }
    localStorage.setItem('sc_low_data', enabled ? 'true' : 'false');
  }
  applyLowDataMode(isLowDataMode);

  if (lowDataToggleBtn) {
    lowDataToggleBtn.addEventListener('click', () => {
      isLowDataMode = !isLowDataMode;
      applyLowDataMode(isLowDataMode);
      showToast(isLowDataMode ? '⚡ Low-Data Mode enabled (animations disabled, optimized for 2G/3G)' : '⚡ Standard High-Definition Mode restored', 'info');
    });
  }

  // ================= Toast Notification System =================
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : type === 'danger' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4200);
  }

  // ================= Activity Logger =================
  function logActivity(actionType, description, badgeColor = 'login') {
    const timeInfo = getCurrentTimeInfo();
    const currentUser = db.users[db.currentUserId] || { name: 'Campus User', role: 'Student' };
    const actorRole = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    const logEntry = {
      id: 'ACT-' + Math.floor(1000 + Math.random() * 9000),
      actionType: actionType,
      badgeColor: badgeColor,
      actorRole: actorRole,
      actorName: currentUser.name,
      description: description,
      timeInfo: timeInfo
    };

    db.activityHistory.unshift(logEntry);
    if (db.activityHistory.length > 200) db.activityHistory.pop();
    persistDb();
  }

  function updateHistoryCountBadge() {
    const badge = document.getElementById('headerHistoryCount');
    if (badge) {
      badge.textContent = db.activityHistory.length;
    }
  }

  // ================= UI Panels =================
  const roleTabs = document.querySelectorAll('.role-tab');
  const panels = {
    student: document.getElementById('studentPanel'),
    faculty: document.getElementById('facultyPanel'),
    admin: document.getElementById('adminPanel'),
    parent: document.getElementById('parentPanel')
  };
  const demoUrlText = document.getElementById('demoUrlText');

  // ================= Active User Synchronization =================
  function syncCurrentUserUI() {
    const campusLoginSection = document.getElementById('campusLoginSection');
    const portalDashboardShell = document.getElementById('portalDashboardShell');
    const userHeaderWidget = document.getElementById('userHeaderWidget');
    const btnHeaderLoginPrompt = document.getElementById('btnHeaderLoginPrompt');
    const portalsBadgeText = document.getElementById('portalsBadgeText');
    const portalsTitleText = document.getElementById('portalsTitleText');
    const portalsSubtitleText = document.getElementById('portalsSubtitleText');
    const heroCtaText = document.getElementById('heroCtaText');

    const user = db.users[db.currentUserId];

    // If NO user is signed in, display the Campus Login Portal
    if (!user) {
      if (campusLoginSection) campusLoginSection.style.display = 'block';
      if (portalDashboardShell) portalDashboardShell.style.display = 'none';
      if (userHeaderWidget) userHeaderWidget.style.display = 'none';
      if (btnHeaderLoginPrompt) btnHeaderLoginPrompt.style.display = 'inline-flex';
      if (portalsBadgeText) portalsBadgeText.textContent = 'Institutional Single Sign-On';
      if (portalsTitleText) portalsTitleText.textContent = 'Campus Login Portal';
      if (portalsSubtitleText) portalsSubtitleText.textContent = 'Please select your campus role or sign in with your credentials to access your personalized workspace and daily actions.';
      if (heroCtaText) heroCtaText.textContent = 'Sign In to Campus Portal';
      return;
    }

    // When an authenticated user is active:
    if (campusLoginSection) campusLoginSection.style.display = 'none';
    if (portalDashboardShell) portalDashboardShell.style.display = 'block';
    if (userHeaderWidget) userHeaderWidget.style.display = 'flex';
    if (btnHeaderLoginPrompt) btnHeaderLoginPrompt.style.display = 'none';
    if (portalsBadgeText) portalsBadgeText.textContent = 'Active Campus Workspace';
    if (portalsTitleText) portalsTitleText.textContent = `Institutional Workspace: ${user.name}`;
    if (portalsSubtitleText) portalsSubtitleText.textContent = `Personalized ${user.role.toUpperCase()} Console • Daily actions, online attendance register, and real-time records.`;
    if (heroCtaText) heroCtaText.textContent = `Open My ${user.role.toUpperCase()} Dashboard`;

    // 1. Header User Details
    const headerUserName = document.getElementById('headerUserName');
    const headerUserRole = document.getElementById('headerUserRole');
    const headerUserAvatar = document.getElementById('headerUserAvatar');
    const dropdownFullName = document.getElementById('dropdownFullName');
    const dropdownSubInfo = document.getElementById('dropdownSubInfo');

    if (headerUserName) headerUserName.textContent = user.name.split(' ')[0];
    if (headerUserRole) headerUserRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    if (headerUserAvatar) headerUserAvatar.textContent = user.avatar;
    if (dropdownFullName) dropdownFullName.textContent = user.name;
    if (dropdownSubInfo) {
      if (user.role === 'student') dropdownSubInfo.textContent = `Roll: ${user.roll} • ${user.sem}`;
      else if (user.role === 'faculty') dropdownSubInfo.textContent = `${user.designation} • ${user.dept}`;
      else if (user.role === 'admin') dropdownSubInfo.textContent = `${user.designation} • ${user.dept}`;
      else if (user.role === 'parent') dropdownSubInfo.textContent = `Ward: ${user.wardName}`;
    }

    // 2. Active User Status Bar
    const statusBarAvatar = document.getElementById('statusBarAvatar');
    const statusBarName = document.getElementById('statusBarName');
    const statusBarRoleBadge = document.getElementById('statusBarRoleBadge');
    const statusBarSubDetail = document.getElementById('statusBarSubDetail');

    if (statusBarAvatar) statusBarAvatar.textContent = user.avatar;
    if (statusBarName) statusBarName.textContent = user.name;
    if (statusBarRoleBadge) {
      statusBarRoleBadge.textContent = user.role.toUpperCase();
      statusBarRoleBadge.className = `status-role-badge role-${user.role}`;
    }
    if (statusBarSubDetail) {
      if (user.role === 'student') statusBarSubDetail.textContent = `Roll: ${user.roll} • ${user.sem} • ${user.dept}`;
      else if (user.role === 'faculty') statusBarSubDetail.textContent = `${user.designation} • ${user.dept} • Staff ID: ${user.staffId}`;
      else if (user.role === 'admin') statusBarSubDetail.textContent = `${user.designation} • Central Governance • ID: ${user.staffId}`;
      else if (user.role === 'parent') statusBarSubDetail.textContent = `Parent / Guardian of ${user.wardName}`;
    }

    // 3. Switch to Appropriate Role Tab
    switchRoleTab(user.role);

    // 4. Populate Student Dashboard Data
    if (user.role === 'student') {
      renderStudentDashboard(user);
    }

    // 5. Populate Faculty Register & Queue Data
    if (user.role === 'faculty') {
      renderFacultyAttendanceRegister();
      renderFacultyRequestsTable();
      renderFacultyFeedbackView();
    }

    // 6. Populate Admin Dashboard KPIs & Defaulters
    if (user.role === 'admin') {
      renderAdminDashboard();
      renderAdminFeedbackRadar();
    }

    // 7. Populate Parent Dashboard Data
    if (user.role === 'parent') {
      renderParentDashboard(user);
    }
  }

  function switchRoleTab(roleName) {
    roleTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === roleName);
    });

    Object.keys(panels).forEach(key => {
      if (panels[key]) {
        panels[key].classList.toggle('active', key === roleName);
      }
    });

    if (demoUrlText) {
      demoUrlText.textContent = `https://portal.smartcampus.edu/${roleName}/dashboard`;
    }
  }

  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetRole = tab.dataset.tab;
      if (db.currentUserId && db.users[db.currentUserId].role !== targetRole) {
        const defaultForRole = Object.values(db.users).find(u => u.role === targetRole);
        if (defaultForRole) {
          performLogin(defaultForRole.id);
          return;
        }
      }
      switchRoleTab(targetRole);
    });
  });

  // ================= STUDENT ATTENDANCE & PERFORMANCE HUB =================
  function renderStudentDashboard(user) {
    const studentGreeting = document.querySelector('#studentPanel .user-greeting-title');
    const studentSub = document.querySelector('#studentPanel .user-greeting-sub');
    const studentAvatar = document.querySelector('#studentPanel .user-mini-avatar');

    if (studentGreeting) studentGreeting.textContent = `Hello, ${user.name.split(' ')[0]}! 👋`;
    if (studentSub) studentSub.textContent = `B.Tech ${user.dept} • Roll No: ${user.roll} • ${user.sem}`;
    if (studentAvatar) studentAvatar.textContent = user.avatar;

    // Attendance Gauge & Safety Margin
    const overallPct = user.attendance;
    const studentOverallAttPct = document.getElementById('studentOverallAttPct');
    const studentOverallGaugeRing = document.getElementById('studentOverallGaugeRing');
    const studentAttStatusChip = document.getElementById('studentAttStatusChip');
    const studentAttStatusText = document.getElementById('studentAttStatusText');
    const studentAttClassesCount = document.getElementById('studentAttClassesCount');
    const studentAttMarginText = document.getElementById('studentAttMarginText');

    if (studentOverallAttPct) studentOverallAttPct.textContent = `${overallPct}%`;
    if (studentAttClassesCount) studentAttClassesCount.textContent = `${user.attendanceAttended} / ${user.attendanceSessionsTotal}`;

    // Circumference = 2 * PI * 50 = 314.16
    if (studentOverallGaugeRing) {
      const circumference = 314.16;
      const offset = circumference - (circumference * overallPct) / 100;
      studentOverallGaugeRing.style.strokeDashoffset = offset;
      studentOverallGaugeRing.style.stroke = overallPct >= 75 ? 'var(--brand-emerald)' : 'var(--brand-rose)';
    }

    if (studentAttStatusChip && studentAttStatusText) {
      if (overallPct >= 75) {
        studentAttStatusChip.className = 'attendance-status-chip safe';
        studentAttStatusText.textContent = 'Safe Zone (Above 75% Requirement)';
      } else {
        studentAttStatusChip.className = 'attendance-status-chip danger';
        studentAttStatusText.textContent = 'Attendance Shortage Risk (< 75%)';
      }
    }

    // Safety margin calculation
    if (studentAttMarginText) {
      if (overallPct >= 75) {
        // Classes student can safely miss: floor((attended - 0.75 * total) / 0.75)
        const safeToMiss = Math.max(0, Math.floor((user.attendanceAttended - 0.75 * user.attendanceSessionsTotal) / 0.75));
        studentAttMarginText.innerHTML = `💡 <strong>Safety Margin:</strong> You can safely miss up to <strong>${safeToMiss || 2} upcoming classes</strong> without dropping below the 75% exam criteria.`;
      } else {
        // Classes needed to recover: ceil((0.75 * total - attended) / 0.25)
        const needed = Math.max(1, Math.ceil((0.75 * user.attendanceSessionsTotal - user.attendanceAttended) / 0.25));
        studentAttMarginText.innerHTML = `🚨 <strong>Attendance Shortage:</strong> You must attend the next <strong>${needed} consecutive lectures</strong> without absence to regain 75% exam eligibility!`;
      }
    }

    // Subject-wise Breakdown Rows
    const studentSubjectRowsList = document.getElementById('studentSubjectRowsList');
    if (studentSubjectRowsList && user.subjects) {
      studentSubjectRowsList.innerHTML = '';
      user.subjects.forEach(sub => {
        const row = document.createElement('div');
        row.className = 'subject-card-row';
        const isSafe = sub.percentage >= 75;
        const barColor = isSafe ? 'var(--brand-emerald)' : 'var(--brand-rose)';
        const badgeColorClass = isSafe ? 'status-approved' : 'status-danger';

        row.innerHTML = `
          <div class="subject-row-header">
            <div>
              <strong style="color: var(--text-primary); font-size: 0.9rem;">${sub.code}: ${sub.name}</strong>
              <small class="text-muted d-block" style="font-size: 0.78rem;">Faculty: ${sub.faculty}</small>
            </div>
            <div style="text-align: right;">
              <span class="status-pill ${badgeColorClass}" style="font-weight: 700;">${sub.percentage}%</span>
              <small class="text-muted d-block" style="font-size: 0.75rem;">${sub.attended} / ${sub.total} Held</small>
            </div>
          </div>
          <div class="subject-bar-wrap">
            <div class="subject-bar-fill" style="width: ${sub.percentage}%; background: ${barColor};"></div>
          </div>
        `;
        row.addEventListener('click', () => {
          openAttendanceModal();
        });
        studentSubjectRowsList.appendChild(row);
      });
    }

    // Gate Pass Status Widget
    const studentPass = db.gatePasses.find(p => p.studentId === user.id) || {
      id: 'None',
      category: 'None',
      reason: 'No active gate pass request.',
      outTime: '--:--',
      inTime: '--:--',
      status: 'No Pass',
      reviewedBy: 'N/A'
    };

    const passStatusBadge = document.getElementById('currentPassStatusBadge');
    const passReason = document.getElementById('currentPassReason');
    const passTime = document.getElementById('currentPassTime');
    const passApprover = document.getElementById('currentPassApprover');
    const passIdBadge = document.querySelector('#studentActivePassDisplay .pass-id-badge');

    if (passStatusBadge) {
      passStatusBadge.textContent = studentPass.status;
      passStatusBadge.className = studentPass.status === 'Approved' ? 'status-pill status-approved' :
                                 studentPass.status === 'Pending' ? 'status-pill status-pending' : 'status-pill';
    }
    if (passReason) passReason.textContent = studentPass.reason;
    if (passTime) passTime.textContent = `Today: ${studentPass.outTime} - ${studentPass.inTime}`;
    if (passApprover) passApprover.textContent = studentPass.reviewedBy || 'Awaiting Review';
    if (passIdBadge) passIdBadge.textContent = studentPass.id !== 'None' ? `PASS #${studentPass.id}` : 'NO ACTIVE PASS';
  }

  // ================= FACULTY ONLINE ATTENDANCE REGISTER =================
  // State for the active roll-call session in faculty register
  let liveRollCallState = {
    student1: 'P',
    student2: 'A',
    student3: 'P'
  };

  function renderFacultyAttendanceRegister() {
    const tbody = document.getElementById('facRollCallTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const students = [db.users.student1, db.users.student2, db.users.student3];
    const subjectSelect = document.getElementById('facAttSubjectSelect');
    const subjectCode = subjectSelect ? subjectSelect.value : 'CS501';

    let presentCount = 0;
    let absentCount = 0;

    students.forEach(std => {
      const status = liveRollCallState[std.id] || 'P';
      if (status === 'P') presentCount++;
      else if (status === 'A') absentCount++;

      const subData = std.subjects.find(s => s.code === subjectCode) || std.subjects[0];

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="font-family: var(--font-mono);">${std.roll}</strong></td>
        <td>
          <strong>${std.name}</strong><br>
          <small class="text-muted">${std.sem}</small>
        </td>
        <td>
          <span class="status-pill ${subData.percentage >= 75 ? 'status-approved' : 'status-danger'}">
            ${subData.percentage}% (${subData.attended}/${subData.total})
          </span>
        </td>
        <td>
          <span class="status-pill ${std.attendance >= 75 ? 'status-approved' : 'status-danger'}">
            ${std.attendance}%
          </span>
        </td>
        <td>
          <div class="rollcall-action-btns">
            <button type="button" class="btn-att-toggle btn-att-p ${status === 'P' ? 'active-p' : ''}" data-std-id="${std.id}" data-val="P">P</button>
            <button type="button" class="btn-att-toggle btn-att-a ${status === 'A' ? 'active-a' : ''}" data-std-id="${std.id}" data-val="A">A</button>
            <button type="button" class="btn-att-toggle btn-att-l ${status === 'L' ? 'active-l' : ''}" data-std-id="${std.id}" data-val="L">L</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Wire toggle buttons
    tbody.querySelectorAll('.btn-att-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const stdId = btn.dataset.stdId;
        const val = btn.dataset.val;
        liveRollCallState[stdId] = val;
        renderFacultyAttendanceRegister();
      });
    });

    // Update Counters
    const totalCount = students.length;
    const rollcallTotalCount = document.getElementById('rollcallTotalCount');
    const rollcallPresentCount = document.getElementById('rollcallPresentCount');
    const rollcallAbsentCount = document.getElementById('rollcallAbsentCount');
    const rollcallRatioText = document.getElementById('rollcallRatioText');

    if (rollcallTotalCount) rollcallTotalCount.innerHTML = `Enrolled: <strong>${totalCount}</strong>`;
    if (rollcallPresentCount) rollcallPresentCount.innerHTML = `Present: <strong>${presentCount}</strong>`;
    if (rollcallAbsentCount) rollcallAbsentCount.innerHTML = `Absent: <strong>${absentCount}</strong>`;
    const ratio = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : '0';
    if (rollcallRatioText) rollcallRatioText.innerHTML = `Session Attendance Rate: <strong>${ratio}%</strong>`;
  }

  // Bulk Roll Call Actions
  const btnMarkAllPresent = document.getElementById('btnMarkAllPresent');
  if (btnMarkAllPresent) {
    btnMarkAllPresent.addEventListener('click', () => {
      liveRollCallState = { student1: 'P', student2: 'P', student3: 'P' };
      renderFacultyAttendanceRegister();
      showToast('All students marked Present for this session', 'info');
    });
  }

  const btnMarkAllAbsent = document.getElementById('btnMarkAllAbsent');
  if (btnMarkAllAbsent) {
    btnMarkAllAbsent.addEventListener('click', () => {
      liveRollCallState = { student1: 'A', student2: 'A', student3: 'A' };
      renderFacultyAttendanceRegister();
      showToast('All students marked Absent for this session', 'info');
    });
  }

  const facAttSubjectSelect = document.getElementById('facAttSubjectSelect');
  if (facAttSubjectSelect) {
    facAttSubjectSelect.addEventListener('change', () => {
      renderFacultyAttendanceRegister();
    });
  }

  // Submit and Save Live Attendance Register
  const btnSubmitLiveAttendance = document.getElementById('btnSubmitLiveAttendance');
  if (btnSubmitLiveAttendance) {
    btnSubmitLiveAttendance.addEventListener('click', () => {
      const subjectSelect = document.getElementById('facAttSubjectSelect');
      const subjectCode = subjectSelect ? subjectSelect.value : 'CS501';
      const slotSelect = document.getElementById('facAttSlotSelect');
      const slot = slotSelect ? slotSelect.value : 'Period 2';
      const batchSelect = document.getElementById('facAttBatchSelect');
      const batch = batchSelect ? batchSelect.value : 'CSE 5th Sem - Batch A';
      const topicInput = document.getElementById('facAttTopicInput');
      const topic = topicInput ? topicInput.value.trim() : 'Lecture Topic';

      const timeInfo = getCurrentTimeInfo();
      const currentUser = db.users[db.currentUserId] || { name: 'Prof. A.K. Sharma' };

      // Update student databases
      const students = [db.users.student1, db.users.student2, db.users.student3];
      let presentTotal = 0;

      students.forEach(std => {
        const mark = liveRollCallState[std.id] || 'P';
        const isPresent = mark === 'P' || mark === 'L';
        if (isPresent) presentTotal++;

        // Update overall
        std.attendanceSessionsTotal += 1;
        if (isPresent) std.attendanceAttended += 1;
        std.attendance = Math.round((std.attendanceAttended / std.attendanceSessionsTotal) * 100);

        // Update specific subject
        const sub = std.subjects.find(s => s.code === subjectCode);
        if (sub) {
          sub.total += 1;
          if (isPresent) sub.attended += 1;
          sub.percentage = Math.round((sub.attended / sub.total) * 100);
        }

        // If attendance drops below 75%, simulate sending a Parent SMS Alert!
        if (std.attendance < 75) {
          const smsText = `URGENT - Smart Campus: ${std.name}'s overall attendance has dropped to ${std.attendance}%. Regulation requires minimum 75% for semester examinations.`;
          db.smsLogs.unshift({
            id: 'SMS-' + Math.floor(1000 + Math.random() * 9000),
            time: timeInfo.time,
            date: timeInfo.date,
            to: `+91 98******10 (${std.parentId === 'parent2' ? 'Mrs. S. Verma' : 'Mr. N. Mohapatra'})`,
            type: 'Shortage Alert',
            message: smsText
          });
        }
      });

      // Save new session into attendanceSessions
      const newSession = {
        id: 'ATT-S' + (102 + db.attendanceSessions.length),
        date: timeInfo.date,
        time: timeInfo.time,
        subjectCode: subjectCode,
        subjectName: subjectCode === 'CS501' ? 'AI & Machine Learning' : subjectCode === 'CS502' ? 'Cloud Computing' : 'Data Structures',
        topic: topic,
        faculty: currentUser.name,
        batch: batch,
        records: { ...liveRollCallState }
      };
      db.attendanceSessions.unshift(newSession);

      // Log Activity with exact Day, Date, Time
      logActivity(
        'ATTENDANCE',
        `Faculty ${currentUser.name} recorded live online roll call for ${subjectCode} (${batch} • "${topic}"). Present: ${presentTotal}/${students.length}. Records synced instantly on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`,
        'attendance'
      );

      persistDb();
      renderFacultyAttendanceRegister();
      syncCurrentUserUI();

      showToast(`✅ Live Attendance for ${subjectCode} submitted and database synchronized!`, 'success');
    });
  }

  // ================= ADMIN DASHBOARD OVERSIGHT =================
  function renderAdminDashboard() {
    updateAdminKPIs();

    // Attendance Defaulter Roster
    const adminShortageTableBody = document.getElementById('adminShortageTableBody');
    if (adminShortageTableBody) {
      adminShortageTableBody.innerHTML = '';
      const defaulters = Object.values(db.users).filter(u => u.role === 'student' && u.attendance < 75);

      const adminShortageCountBadge = document.getElementById('adminShortageCountBadge');
      if (adminShortageCountBadge) {
        adminShortageCountBadge.textContent = `${defaulters.length} Defaulter${defaulters.length === 1 ? '' : 's'}`;
      }

      if (defaulters.length === 0) {
        adminShortageTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted" style="padding: 1rem;">🎉 All enrolled students meet the mandatory 75% attendance threshold!</td></tr>`;
      } else {
        defaulters.forEach(def => {
          const lowestSub = def.subjects.reduce((prev, curr) => (prev.percentage < curr.percentage ? prev : curr), def.subjects[0]);
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>
              <strong>${def.name}</strong><br>
              <small class="text-muted">${def.roll} • ${def.sem}</small>
            </td>
            <td><span class="status-pill status-danger">${def.attendance}%</span></td>
            <td>${lowestSub.code} (${lowestSub.percentage}%)</td>
            <td>
              <button class="btn btn-xs btn-outline btn-send-warning-sms" data-std-id="${def.id}">📲 Send Warning SMS</button>
            </td>
          `;
          adminShortageTableBody.appendChild(tr);
        });

        adminShortageTableBody.querySelectorAll('.btn-send-warning-sms').forEach(btn => {
          btn.addEventListener('click', () => {
            const std = db.users[btn.dataset.stdId];
            if (!std) return;
            const timeInfo = getCurrentTimeInfo();
            const msg = `Smart Campus Alert: Ward ${std.name} (${std.roll}) is currently at ${std.attendance}% attendance. Minimum 75% required for exam eligibility.`;
            db.smsLogs.unshift({
              id: 'SMS-' + Math.floor(1000 + Math.random() * 9000),
              time: timeInfo.time,
              date: timeInfo.date,
              to: '+91 98******10 (Guardian)',
              type: 'Admin Shortage Warning',
              message: msg
            });
            logActivity('ATTENDANCE', `Admin dispatched targeted Attendance Shortage SMS warning to parents of ${std.name} (${std.attendance}%).`, 'attendance');
            persistDb();
            showToast(`Targeted Parent SMS sent to guardian of ${std.name}!`, 'success');
          });
        });
      }
    }

    // Refresh Campus User Directory Roster
    renderAdminUserDirectory();
  }

  function updateAdminKPIs() {
    const activePassesCount = db.gatePasses.filter(p => p.status === 'Approved').length;
    const pendingPassesCount = db.gatePasses.filter(p => p.status === 'Pending').length;
    const kpiPasses = document.getElementById('kpiPasses');
    if (kpiPasses) kpiPasses.textContent = activePassesCount + pendingPassesCount;
  }

  // Admin Broadcast Circular Form
  const adminBroadcastForm = document.getElementById('adminBroadcastForm');
  if (adminBroadcastForm) {
    adminBroadcastForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const audience = document.getElementById('broadcastAudience').value;
      const priority = document.getElementById('broadcastPriority').value;
      const title = document.getElementById('broadcastTitle').value;
      const body = document.getElementById('broadcastBody').value;
      const timeInfo = getCurrentTimeInfo();

      logActivity('ATTENDANCE', `Admin broadcasted circular "${title}" to [${audience}] via ${priority} on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'attendance');
      showToast(`Circular broadcasted to ${audience}! SMS gateway queued.`, 'success');
      adminBroadcastForm.reset();
    });
  }

  // Admin Quick Control Buttons
  const btnAdminOpenHistory = document.getElementById('btnAdminOpenHistory');
  if (btnAdminOpenHistory) btnAdminOpenHistory.addEventListener('click', () => openHistoryModal());

  const btnAdminOpenComplaints = document.getElementById('btnAdminOpenComplaints');
  if (btnAdminOpenComplaints) btnAdminOpenComplaints.addEventListener('click', () => openModal(document.getElementById('complaintsModal')));

  const btnAdminViewSmsLogs = document.getElementById('btnAdminViewSmsLogs');
  if (btnAdminViewSmsLogs) btnAdminViewSmsLogs.addEventListener('click', () => openSmsSimulationModal());

  const btnAdminEscalateVendor = document.getElementById('btnAdminEscalateVendor');
  if (btnAdminEscalateVendor) {
    btnAdminEscalateVendor.addEventListener('click', () => {
      showToast('Campus Network Engineer dispatched to Hostel Block B with High Priority SLA!', 'success');
    });
  }

  const btnAdminViewAllComplaints = document.getElementById('btnAdminViewAllComplaints');
  if (btnAdminViewAllComplaints) {
    btnAdminViewAllComplaints.addEventListener('click', () => openModal(document.getElementById('complaintsModal')));
  }

  // ================= PARENT DASHBOARD & SMS RADAR =================
  function renderParentDashboard(user) {
    const parentGreetingTitle = document.getElementById('parentGreetingTitle');
    const parentGreetingSub = document.getElementById('parentGreetingSub');
    if (parentGreetingTitle) parentGreetingTitle.textContent = `Welcome, ${user.name}! 👋`;
    if (parentGreetingSub) parentGreetingSub.textContent = `Parent / Guardian of ${user.wardName} • Roll: ${user.wardId === 'student1' ? 'CS-2024-082' : 'CS-2024-015'}`;

    const ward = db.users[user.wardId] || db.users.student1;

    // Ward Attendance
    const parentWardOverallPct = document.getElementById('parentWardOverallPct');
    const parentWardOverallBar = document.getElementById('parentWardOverallBar');
    const parentTileAttBadge = document.getElementById('parentTileAttBadge');

    if (parentWardOverallPct) parentWardOverallPct.textContent = `${ward.attendance}%`;
    if (parentWardOverallBar) {
      parentWardOverallBar.style.width = `${ward.attendance}%`;
      parentWardOverallBar.style.background = ward.attendance >= 75 ? 'var(--brand-emerald)' : 'var(--brand-rose)';
    }
    if (parentTileAttBadge) {
      parentTileAttBadge.textContent = `${ward.attendance}% (${ward.attendance >= 75 ? 'Good Standing' : 'Shortage Risk'})`;
      parentTileAttBadge.className = `tile-badge ${ward.attendance >= 75 ? 'badge-success' : 'badge-unread'}`;
    }

    // Ward Subject List
    const parentWardSubjectList = document.getElementById('parentWardSubjectList');
    if (parentWardSubjectList && ward.subjects) {
      parentWardSubjectList.innerHTML = '';
      ward.subjects.forEach(s => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
        item.style.padding = '0.35rem 0';
        item.innerHTML = `
          <span>${s.name} (${s.code}):</span>
          <strong class="${s.percentage >= 75 ? 'green-text' : 'orange-text'}">${s.percentage}% (${s.attended}/${s.total})</strong>
        `;
        parentWardSubjectList.appendChild(item);
      });
    }

    // Ward Gate Pass Details
    const wardPass = db.gatePasses.find(p => p.studentId === user.wardId);
    const parentPassDetailsText = document.getElementById('parentPassDetailsText');
    const parentPassStatusPill = document.getElementById('parentPassStatusPill');
    const parentTilePassBadge = document.getElementById('parentTilePassBadge');

    if (wardPass && parentPassDetailsText) {
      parentPassDetailsText.innerHTML = `
        <strong>Pass ID:</strong> #${wardPass.id}<br>
        <strong>Purpose:</strong> ${wardPass.reason} (${wardPass.category})<br>
        <strong>Permitted Hours:</strong> Today: ${wardPass.outTime} - ${wardPass.inTime}<br>
        <strong>Reviewed By:</strong> ${wardPass.reviewedBy}
      `;
      if (parentPassStatusPill) parentPassStatusPill.textContent = wardPass.status;
      if (parentTilePassBadge) parentTilePassBadge.textContent = `Pass #${wardPass.id} (${wardPass.status})`;
    }
  }

  // Parent Tile Actions
  const parentTileAttendance = document.getElementById('parentTileAttendance');
  if (parentTileAttendance) parentTileAttendance.addEventListener('click', () => openAttendanceModal());

  const parentTileSms = document.getElementById('parentTileSms');
  if (parentTileSms) parentTileSms.addEventListener('click', () => openSmsSimulationModal());

  const btnParentViewSmsHistory = document.getElementById('btnParentViewSmsHistory');
  if (btnParentViewSmsHistory) btnParentViewSmsHistory.addEventListener('click', () => openSmsSimulationModal());

  const btnParentCallAdvisor = document.getElementById('btnParentCallAdvisor');
  if (btnParentCallAdvisor) {
    btnParentCallAdvisor.addEventListener('click', () => {
      showToast('Connecting call to Class Advisor Prof. A.K. Sharma (+91 98450-XXXXX)...', 'info');
    });
  }

  const btnParentCallWarden = document.getElementById('btnParentCallWarden');
  if (btnParentCallWarden) {
    btnParentCallWarden.addEventListener('click', () => {
      showToast('Connecting call to Chief Hostel Warden (+91 99370-XXXXX)...', 'info');
    });
  }

  // ================= MODAL 8: ATTENDANCE HISTORY & CERTIFICATE =================
  const attendanceModal = document.getElementById('attendanceModal');
  const btnStudentViewAllAttendance = document.getElementById('btnStudentViewAllAttendance');
  if (btnStudentViewAllAttendance) btnStudentViewAllAttendance.addEventListener('click', () => openAttendanceModal());

  function openAttendanceModal() {
    const user = db.users[db.currentUserId] || db.users.student1;
    const modalAttOverallPct = document.getElementById('modalAttOverallPct');
    const modalAttTotalHeld = document.getElementById('modalAttTotalHeld');
    const modalAttAttended = document.getElementById('modalAttAttended');
    const modalAttEligiblePill = document.getElementById('modalAttEligiblePill');

    if (modalAttOverallPct) modalAttOverallPct.textContent = `${user.attendance || 88}%`;
    if (modalAttTotalHeld) modalAttTotalHeld.textContent = `${user.attendanceSessionsTotal || 154} Classes`;
    if (modalAttAttended) modalAttAttended.textContent = `${user.attendanceAttended || 136} Classes`;
    if (modalAttEligiblePill) {
      modalAttEligiblePill.textContent = (user.attendance || 88) >= 75 ? 'Eligible (Above 75%)' : 'Shortage Warning (< 75%)';
      modalAttEligiblePill.className = `m-val status-pill ${(user.attendance || 88) >= 75 ? 'status-approved' : 'status-danger'}`;
    }

    // Subject Mini Grid
    const modalSubjectCardsGrid = document.getElementById('modalSubjectCardsGrid');
    if (modalSubjectCardsGrid && user.subjects) {
      modalSubjectCardsGrid.innerHTML = '';
      user.subjects.forEach(sub => {
        const div = document.createElement('div');
        div.className = 'subject-mini-card';
        div.innerHTML = `
          <strong>${sub.code}: ${sub.name}</strong>
          <div style="font-size: 0.8rem; margin: 0.25rem 0;">Attended: <strong>${sub.attended}/${sub.total}</strong></div>
          <span class="status-pill ${sub.percentage >= 75 ? 'status-approved' : 'status-danger'}">${sub.percentage}%</span>
        `;
        modalSubjectCardsGrid.appendChild(div);
      });
    }

    // Session History Table
    const modalAttSessionsTableBody = document.getElementById('modalAttSessionsTableBody');
    if (modalAttSessionsTableBody) {
      modalAttSessionsTableBody.innerHTML = '';
      db.attendanceSessions.forEach(sess => {
        const studentMark = sess.records[user.id] || 'P';
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${sess.date}</strong><br><small class="text-muted">${sess.time}</small></td>
          <td>${sess.subjectCode}</td>
          <td>${sess.topic}</td>
          <td>${sess.faculty}</td>
          <td>
            <span class="status-pill ${studentMark === 'P' ? 'status-approved' : studentMark === 'L' ? 'status-progress' : 'status-danger'}">
              ${studentMark === 'P' ? 'Present' : studentMark === 'L' ? 'Late' : 'Absent'}
            </span>
          </td>
        `;
        modalAttSessionsTableBody.appendChild(tr);
      });
    }

    openModal(attendanceModal);
  }

  const btnPrintAttendanceCert = document.getElementById('btnPrintAttendanceCert');
  if (btnPrintAttendanceCert) {
    btnPrintAttendanceCert.addEventListener('click', () => {
      showToast('Generating official digitally sealed Attendance Sheet (Form AC-75)...', 'info');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  // ================= MODAL 9: TIMETABLE & SCHEDULE =================
  const timetableModal = document.getElementById('timetableModal');
  const openTimetableModalBtn = document.getElementById('openTimetableModalBtn');
  let currentTimetableDay = 'Monday';

  if (openTimetableModalBtn) {
    openTimetableModalBtn.addEventListener('click', () => {
      renderTimetableDay(currentTimetableDay);
      openModal(timetableModal);
    });
  }

  function renderTimetableDay(day) {
    const tbody = document.getElementById('timetablePeriodsBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const periods = db.timetableData[day] || [];
    periods.forEach(p => {
      const tr = document.createElement('tr');
      const isSwap = p.status.includes('Swap') || p.status.includes('Extra');
      tr.innerHTML = `
        <td><strong>${p.time}</strong></td>
        <td><strong>${p.code}: ${p.name}</strong></td>
        <td>${p.faculty}</td>
        <td>${p.venue}</td>
        <td><span class="status-pill ${isSwap ? 'status-progress' : 'status-approved'}">${p.status}</span></td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('#timetableDayTabs .tt-day-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.day === day);
    });
  }

  document.querySelectorAll('#timetableDayTabs .tt-day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTimetableDay = btn.dataset.day;
      renderTimetableDay(currentTimetableDay);
    });
  });

  const timetableSwapForm = document.getElementById('timetableSwapForm');
  if (timetableSwapForm) {
    timetableSwapForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sub = document.getElementById('ttSwapSubject').value;
      const venue = document.getElementById('ttSwapVenue').value;
      const swapType = document.getElementById('ttSwapType').value;
      const timeInfo = getCurrentTimeInfo();

      logActivity('ATTENDANCE', `Faculty broadcasted schedule change for ${sub}: Venue relocated to "${venue}" (${swapType}) on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'attendance');
      showToast(`Timetable announcement broadcasted for ${sub} (${venue})!`, 'success');
      timetableSwapForm.reset();
    });
  }

  // ================= MODAL 10: MESS SERVICES & RATING =================
  const messModal = document.getElementById('messModal');
  const openMessModalBtn = document.getElementById('openMessModalBtn');
  const btnStudentOpenMessModal = document.getElementById('btnStudentOpenMessModal');

  if (openMessModalBtn) openMessModalBtn.addEventListener('click', () => openModal(messModal));
  if (btnStudentOpenMessModal) btnStudentOpenMessModal.addEventListener('click', () => openModal(messModal));

  const messFeedbackForm = document.getElementById('messFeedbackForm');
  if (messFeedbackForm) {
    messFeedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const meal = document.getElementById('messMealSelect').value;
      const stars = document.getElementById('messStarSelect').value;
      const comment = document.getElementById('messFeedbackComment').value;
      const timeInfo = getCurrentTimeInfo();

      logActivity('GRIEVANCE', `Submitted Dining Feedback: Rated ${meal} ${stars} Stars ("${comment}") on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'cert');
      showToast(`Thank you! Your feedback for ${meal} was logged for the Campus Mess Committee.`, 'success');
      closeModal(messModal);
    });
  }

  const messRebateForm = document.getElementById('messRebateForm');
  if (messRebateForm) {
    messRebateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const start = document.getElementById('messRebateStart').value;
      const end = document.getElementById('messRebateEnd').value;
      const timeInfo = getCurrentTimeInfo();

      logActivity('GRIEVANCE', `Applied for Mess Leave Rebate from ${start} to ${end}. Credit will be adjusted in next month bill.`, 'cert');
      showToast(`Mess rebate applied successfully from ${start} to ${end}!`, 'success');
      messRebateForm.reset();
    });
  }

  const dashMessRebateBtn = document.getElementById('dashMessRebateBtn');
  if (dashMessRebateBtn) dashMessRebateBtn.addEventListener('click', () => openModal(messModal));

  // ================= MODAL 11: FEE DESK & RECEIPTS =================
  const feeModal = document.getElementById('feeModal');
  const openFeeModalBtn = document.getElementById('openFeeModalBtn');
  if (openFeeModalBtn) openFeeModalBtn.addEventListener('click', () => openModal(feeModal));

  const btnPrintFeeReceipt = document.getElementById('btnPrintFeeReceipt');
  if (btnPrintFeeReceipt) {
    btnPrintFeeReceipt.addEventListener('click', () => {
      showToast('Preparing verifiable fee receipt with digital cryptographic stamp...', 'info');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  // ================= MODAL 12: PARENT & OFFLINE SMS SIMULATION =================
  const smsSimulationModal = document.getElementById('smsSimulationModal');
  function openSmsSimulationModal() {
    renderSmsStream();
    openModal(smsSimulationModal);
  }

  function renderSmsStream() {
    const parentSmsStreamList = document.getElementById('parentSmsStreamList');
    if (!parentSmsStreamList) return;
    parentSmsStreamList.innerHTML = '';

    db.smsLogs.forEach(sms => {
      const item = document.createElement('div');
      item.className = 'sms-bubble-card';
      item.style.background = 'rgba(255,255,255,0.04)';
      item.style.border = '1px solid var(--border-subtle)';
      item.style.borderRadius = 'var(--radius-sm)';
      item.style.padding = '0.75rem';

      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.35rem;">
          <span class="status-pill status-approved" style="font-size: 0.72rem;">${sms.type}</span>
          <span class="text-muted">🕒 ${sms.date} at ${sms.time}</span>
        </div>
        <p style="margin: 0; font-size: 0.85rem; line-height: 1.4; color: var(--text-primary); font-family: var(--font-mono);">${sms.message}</p>
        <small class="text-muted d-block mt-1" style="font-size: 0.74rem;">Recipient: ${sms.to} • Sent via Institutional SMS Gateway</small>
      `;
      parentSmsStreamList.appendChild(item);
    });
  }

  const btnTriggerTestSms = document.getElementById('btnTriggerTestSms');
  if (btnTriggerTestSms) {
    btnTriggerTestSms.addEventListener('click', () => {
      const timeInfo = getCurrentTimeInfo();
      const newSms = {
        id: 'SMS-' + Math.floor(1000 + Math.random() * 9000),
        time: timeInfo.time,
        date: timeInfo.date,
        to: '+91 98******10 (Mr. N. Mohapatra)',
        type: 'Campus Test SMS',
        message: 'Smart Campus: Test notification dispatched successfully via GSM SMS fallback. System operating normally.'
      };
      db.smsLogs.unshift(newSms);
      persistDb();
      renderSmsStream();
      showToast('Simulated SMS alert dispatched to registered guardian number!', 'success');
    });
  }

  // ================= FACULTY GATE PASS QUEUE =================
  function renderFacultyRequestsTable() {
    const tbody = document.getElementById('facultyRequestListBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const pendingPasses = db.gatePasses.filter(p => p.status === 'Pending');

    if (pendingPasses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding: 1.5rem;">🎉 No pending requests in queue! All gate passes & requests have been reviewed.</td></tr>`;
      return;
    }

    pendingPasses.forEach(pass => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <strong>${pass.studentName}</strong><br>
          <small>${pass.roll} • Sem 5</small>
        </td>
        <td><span class="status-pill status-gate">${pass.category}</span></td>
        <td>${pass.reason}</td>
        <td>Today: ${pass.outTime} - ${pass.inTime}</td>
        <td class="action-cell">
          <button class="btn btn-xs btn-success approve-btn" data-pass-id="${pass.id}">Approve</button>
          <button class="btn btn-xs btn-danger reject-btn" data-pass-id="${pass.id}">Reject</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.approve-btn').forEach(btn => {
      btn.onclick = () => {
        handlePassReview(btn.dataset.passId, 'Approved');
      };
    });

    tbody.querySelectorAll('.reject-btn').forEach(btn => {
      btn.onclick = () => {
        handlePassReview(btn.dataset.passId, 'Rejected');
      };
    });
  }

  function handlePassReview(passId, decision) {
    const pass = db.gatePasses.find(p => p.id === passId);
    if (!pass) return;

    const timeInfo = getCurrentTimeInfo();
    const facultyUser = db.users[db.currentUserId] || { name: 'Prof. A.K. Sharma (HOD CSE)' };

    pass.status = decision;
    pass.reviewedBy = `${facultyUser.name} (HOD CSE)`;
    pass.reviewedTimeInfo = timeInfo;

    // Send SMS alert to parent upon decision
    const smsText = `Smart Campus: Gate Pass #${pass.id} for ${pass.studentName} has been ${decision.toUpperCase()} by ${pass.reviewedBy}.`;
    db.smsLogs.unshift({
      id: 'SMS-' + Math.floor(1000 + Math.random() * 9000),
      time: timeInfo.time,
      date: timeInfo.date,
      to: '+91 98******10 (Guardian)',
      type: `Gate Pass ${decision}`,
      message: smsText
    });

    logActivity(
      'GATE_PASS',
      `${decision} Gate Pass #${pass.id} for ${pass.studentName} (${pass.reason}). Scannable QR token updated. Reviewed on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`,
      decision === 'Approved' ? 'gate' : 'grievance'
    );

    persistDb();
    renderFacultyRequestsTable();
    syncCurrentUserUI();

    showToast(`Pass #${pass.id} for ${pass.studentName} marked ${decision}! Parent notified via SMS.`, decision === 'Approved' ? 'success' : 'danger');
  }

  // ================= AUTHENTICATION & LOGIN FLOW =================
  const loginModal = document.getElementById('loginModal');
  const btnUserMenuToggle = document.getElementById('btnUserMenuToggle');
  const userDropdownMenu = document.getElementById('userDropdownMenu');
  const dropdownSwitchUserBtn = document.getElementById('dropdownSwitchUserBtn');
  const dropdownViewHistoryBtn = document.getElementById('dropdownViewHistoryBtn');
  const dropdownLogoutBtn = document.getElementById('dropdownLogoutBtn');
  const btnHeaderLoginPrompt = document.getElementById('btnHeaderLoginPrompt');

  if (btnUserMenuToggle && userDropdownMenu) {
    btnUserMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownMenu.style.display = userDropdownMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
      if (!userDropdownMenu.contains(e.target) && e.target !== btnUserMenuToggle) {
        userDropdownMenu.style.display = 'none';
      }
    });
  }

  function openLoginModal() {
    if (userDropdownMenu) userDropdownMenu.style.display = 'none';
    if (loginModal) openModal(loginModal);
  }

  if (btnHeaderLoginPrompt) {
    btnHeaderLoginPrompt.addEventListener('click', () => {
      const portalsElem = document.getElementById('portals');
      if (portalsElem) portalsElem.scrollIntoView({ behavior: 'smooth' });
      else openLoginModal();
    });
  }

  const btnHeroPortals = document.getElementById('btnHeroPortals');
  if (btnHeroPortals) {
    btnHeroPortals.addEventListener('click', (e) => {
      e.preventDefault();
      const portalsElem = document.getElementById('portals');
      if (portalsElem) portalsElem.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function performLogin(userId) {
    const user = db.users[userId];
    if (!user) return;

    db.currentUserId = userId;
    try {
      sessionStorage.setItem('SC_ACTIVE_SESSION', userId);
    } catch (e) {}

    const timeInfo = getCurrentTimeInfo();
    logActivity('LOGIN', `Signed in successfully as ${user.name} (${user.role.toUpperCase()}) on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'login');
    persistDb();

    if (loginModal) closeModal(loginModal);
    syncCurrentUserUI();

    showToast(`Welcome, ${user.name}! Logged in as ${user.role.toUpperCase()}`, 'success');

    const portalsElem = document.getElementById('portals');
    if (portalsElem) portalsElem.scrollIntoView({ behavior: 'smooth' });
  }

  function performLogout() {
    const prevUser = db.users[db.currentUserId];
    if (prevUser) {
      const timeInfo = getCurrentTimeInfo();
      logActivity('LOGIN', `User ${prevUser.name} (${prevUser.role.toUpperCase()}) signed out of campus portal on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'login');
    }

    db.currentUserId = null;
    try {
      sessionStorage.removeItem('SC_ACTIVE_SESSION');
    } catch (e) {}
    persistDb();

    if (userDropdownMenu) userDropdownMenu.style.display = 'none';
    if (loginModal) closeModal(loginModal);
    syncCurrentUserUI();

    showToast('Signed out of Campus Portal. Please select your role to log in.', 'info');

    const portalsElem = document.getElementById('portals');
    if (portalsElem) portalsElem.scrollIntoView({ behavior: 'smooth' });
  }

  if (dropdownLogoutBtn) dropdownLogoutBtn.addEventListener('click', performLogout);
  const btnStatusBarSignOut = document.getElementById('btnStatusBarSignOut');
  if (btnStatusBarSignOut) btnStatusBarSignOut.addEventListener('click', performLogout);

  if (dropdownSwitchUserBtn) {
    dropdownSwitchUserBtn.addEventListener('click', () => {
      if (userDropdownMenu) userDropdownMenu.style.display = 'none';
      performLogout();
    });
  }
  const btnStatusBarSwitchUser = document.getElementById('btnStatusBarSwitchUser');
  if (btnStatusBarSwitchUser) btnStatusBarSwitchUser.addEventListener('click', performLogout);

  // In-Page Mode Switcher
  const btnModeQuickLogin = document.getElementById('btnModeQuickLogin');
  const btnModeFormLogin = document.getElementById('btnModeFormLogin');
  const quickLoginPortalPanel = document.getElementById('quickLoginPortalPanel');
  const formLoginPortalPanel = document.getElementById('formLoginPortalPanel');
  const loginModeHintText = document.getElementById('loginModeHintText');

  if (btnModeQuickLogin && btnModeFormLogin) {
    btnModeQuickLogin.addEventListener('click', () => {
      btnModeQuickLogin.classList.add('active');
      btnModeFormLogin.classList.remove('active');
      if (quickLoginPortalPanel) quickLoginPortalPanel.style.display = 'block';
      if (formLoginPortalPanel) formLoginPortalPanel.style.display = 'none';
      if (loginModeHintText) loginModeHintText.innerHTML = '<span>Choose any profile below to immediately launch that user\'s view:</span>';
    });

    btnModeFormLogin.addEventListener('click', () => {
      btnModeFormLogin.classList.add('active');
      btnModeQuickLogin.classList.remove('active');
      if (quickLoginPortalPanel) quickLoginPortalPanel.style.display = 'none';
      if (formLoginPortalPanel) formLoginPortalPanel.style.display = 'block';
      if (loginModeHintText) loginModeHintText.innerHTML = '<span>Enter your institutional ID and password to sign in:</span>';
    });
  }

  // Modal Login Mode Switcher
  const tabQuickLoginBtn = document.getElementById('tabQuickLoginBtn');
  const tabFormLoginBtn = document.getElementById('tabFormLoginBtn');
  const quickLoginView = document.getElementById('quickLoginView');
  const formLoginView = document.getElementById('formLoginView');

  if (tabQuickLoginBtn && tabFormLoginBtn) {
    tabQuickLoginBtn.addEventListener('click', () => {
      tabQuickLoginBtn.classList.add('active');
      tabFormLoginBtn.classList.remove('active');
      if (quickLoginView) quickLoginView.style.display = 'block';
      if (formLoginView) formLoginView.style.display = 'none';
    });

    tabFormLoginBtn.addEventListener('click', () => {
      tabFormLoginBtn.classList.add('active');
      tabQuickLoginBtn.classList.remove('active');
      if (quickLoginView) quickLoginView.style.display = 'none';
      if (formLoginView) formLoginView.style.display = 'block';
    });
  }

  // ================= DYNAMIC 1-CLICK PROFILE ACCESS SYNCHRONIZATION =================
  function renderQuickLoginProfiles() {
    const quickStudentsGrid = document.getElementById('quickStudentsGrid');
    const quickFacultyGrid = document.getElementById('quickFacultyGrid');
    const quickAdminBox = document.getElementById('quickAdminBox');
    const quickParentsBox = document.getElementById('quickParentsBox');

    const quickModalStudentsGrid = document.getElementById('quickModalStudentsGrid');
    const quickModalFacultyGrid = document.getElementById('quickModalFacultyGrid');
    const quickModalAdminBox = document.getElementById('quickModalAdminBox');
    const quickModalParentsBox = document.getElementById('quickModalParentsBox');

    const allUsers = Object.values(db.users);
    const students = allUsers.filter(u => u.role === 'student');
    const faculty = allUsers.filter(u => u.role === 'faculty');
    const admins = allUsers.filter(u => u.role === 'admin');
    const parents = allUsers.filter(u => u.role === 'parent');

    function createStudentCard(u) {
      const idTag = u.loginId || u.roll || u.id;
      const passTag = u.passwordChanged ? '🔒 Custom Pass' : `🔑 ${u.password || 'campus123'}`;
      const attPct = u.attendance !== undefined ? u.attendance : 85;
      return `
        <button class="profile-select-card" data-login-id="${u.id}" type="button">
          <div class="p-avatar">${u.avatar || '👨‍🎓'}</div>
          <div class="p-info">
            <strong>${u.name}</strong>
            <small>ID: ${idTag} • ${u.sem || '5th Sem'}</small>
            <span class="p-badge ${attPct >= 75 ? 'green' : 'orange'}">${attPct}% Attendance • ${passTag}</span>
          </div>
          <span class="btn-login-tag">Login &rarr;</span>
        </button>
      `;
    }

    function createFacultyCard(u) {
      const idTag = u.loginId || u.staffId || u.id;
      const passTag = u.passwordChanged ? '🔒 Custom Pass' : `🔑 ${u.password || 'campus123'}`;
      return `
        <button class="profile-select-card" data-login-id="${u.id}" type="button">
          <div class="p-avatar">${u.avatar || '👩‍🏫'}</div>
          <div class="p-info">
            <strong>${u.name}</strong>
            <small>ID: ${idTag} • ${u.dept || 'Engineering'}</small>
            <span class="p-badge blue">${u.designation || 'Faculty'} • ${passTag}</span>
          </div>
          <span class="btn-login-tag">Login &rarr;</span>
        </button>
      `;
    }

    function createAdminCard(u) {
      const idTag = u.loginId || u.staffId || u.id;
      const passTag = u.passwordChanged ? '🔒 Custom Pass' : `🔑 ${u.password || 'campus123'}`;
      return `
        <button class="profile-select-card" data-login-id="${u.id}" type="button">
          <div class="p-avatar">${u.avatar || '👨‍💼'}</div>
          <div class="p-info">
            <strong>${u.name}</strong>
            <small>ID: ${idTag} • Central Governance</small>
            <span class="p-badge orange">${u.designation || 'Administrator'} • ${passTag}</span>
          </div>
          <span class="btn-login-tag">Login &rarr;</span>
        </button>
      `;
    }

    function createParentCard(u) {
      const idTag = u.loginId || u.id;
      const passTag = u.passwordChanged ? '🔒 Custom Pass' : `🔑 ${u.password || 'campus123'}`;
      return `
        <button class="profile-select-card" data-login-id="${u.id}" type="button">
          <div class="p-avatar">${u.avatar || '👪'}</div>
          <div class="p-info">
            <strong>${u.name}</strong>
            <small>ID: ${idTag} • Guardian of ${u.wardName || 'Student'}</small>
            <span class="p-badge teal">Ward Alerts • ${passTag}</span>
          </div>
          <span class="btn-login-tag">Login &rarr;</span>
        </button>
      `;
    }

    // Populate in-page grids
    if (quickStudentsGrid) quickStudentsGrid.innerHTML = students.map(createStudentCard).join('');
    if (quickFacultyGrid) quickFacultyGrid.innerHTML = faculty.map(createFacultyCard).join('');
    if (quickAdminBox) quickAdminBox.innerHTML = admins.map(createAdminCard).join('');
    if (quickParentsBox) quickParentsBox.innerHTML = parents.map(createParentCard).join('');

    // Populate modal grids
    if (quickModalStudentsGrid) quickModalStudentsGrid.innerHTML = students.map(createStudentCard).join('');
    if (quickModalFacultyGrid) quickModalFacultyGrid.innerHTML = faculty.map(createFacultyCard).join('');
    if (quickModalAdminBox) quickModalAdminBox.innerHTML = admins.map(createAdminCard).join('');
    if (quickModalParentsBox) quickModalParentsBox.innerHTML = parents.map(createParentCard).join('');

    // Attach click events to all profile cards
    document.querySelectorAll('.profile-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const loginId = card.dataset.loginId;
        if (loginId) performLogin(loginId);
      });
    });
  }

  // 4 Top Role Selector Cards
  document.querySelectorAll('.role-selector-card').forEach(card => {
    card.addEventListener('click', () => {
      const btn = card.querySelector('.r-btn-action');
      const loginId = btn ? btn.dataset.loginId : null;
      if (loginId) performLogin(loginId);
    });
  });

  // ================= AUTHENTICATION & LOGIN ENGINE =================
  function authenticateAndLogin(role, rawUsername, rawPassword) {
    if (!rawUsername) {
      showToast('⚠️ Please enter your User Login ID / Roll No / Staff ID.', 'warning');
      return;
    }
    if (!rawPassword) {
      showToast('⚠️ Please enter your account password.', 'warning');
      return;
    }

    const username = rawUsername.trim().toLowerCase();
    const password = rawPassword.trim();

    // Match across ID, loginId, roll, staffId, email, or name
    let targetUser = Object.values(db.users).find(u =>
      (u.loginId && u.loginId.toLowerCase() === username) ||
      (u.id && u.id.toLowerCase() === username) ||
      (u.roll && u.roll.toLowerCase() === username) ||
      (u.staffId && u.staffId.toLowerCase() === username) ||
      (u.name && u.name.toLowerCase() === username)
    );

    if (!targetUser) {
      showToast(`❌ Account not found for User ID "${rawUsername}". All accounts must be created by the Administrator before logging in.`, 'danger');
      return;
    }

    const expectedPassword = targetUser.password || 'campus123';
    if (password !== expectedPassword) {
      showToast(`❌ Incorrect password for ${targetUser.name}! Please enter the password assigned by Administrator or your updated password.`, 'danger');
      return;
    }

    performLogin(targetUser.id);

    if (!targetUser.passwordChanged) {
      showToast(`🔑 Signed in with Administrator-created default password. You can change your password anytime via "Change Password".`, 'info');
    }
  }

  const portalInlineLoginForm = document.getElementById('portalInlineLoginForm');
  if (portalInlineLoginForm) {
    portalInlineLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('portalRoleSelect').value;
      const username = document.getElementById('portalUsernameInput').value;
      const password = document.getElementById('portalPasswordInput').value;
      authenticateAndLogin(role, username, password);
    });
  }

  const manualLoginForm = document.getElementById('manualLoginForm');
  if (manualLoginForm) {
    manualLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('loginRoleSelect').value;
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
      authenticateAndLogin(role, username, password);
    });
  }

  // ================= ADMINISTRATOR USER CREATION & PROVISIONING =================
  const newUserRoleSelect = document.getElementById('newUserRole');
  const newUserIdInput = document.getElementById('newUserId');
  const newUserDeptInput = document.getElementById('newUserDept');

  if (newUserRoleSelect && newUserIdInput && newUserDeptInput) {
    newUserRoleSelect.addEventListener('change', () => {
      const r = newUserRoleSelect.value;
      if (r === 'student') {
        newUserIdInput.placeholder = 'e.g. CS-2024-099';
        newUserDeptInput.value = '5th Semester • CSE';
        newUserDeptInput.placeholder = 'e.g. 5th Sem CSE';
      } else if (r === 'faculty') {
        newUserIdInput.placeholder = 'e.g. FAC-088';
        newUserDeptInput.value = 'Computer Science & Engineering';
        newUserDeptInput.placeholder = 'e.g. Computer Science & Engineering';
      } else if (r === 'parent') {
        newUserIdInput.placeholder = 'e.g. PAR-099';
        newUserDeptInput.value = 'Guardian of CS-2024-082 (Satyajit)';
        newUserDeptInput.placeholder = 'e.g. Guardian of Student Roll No';
      } else if (r === 'admin') {
        newUserIdInput.placeholder = 'e.g. ADM-008';
        newUserDeptInput.value = 'Central Academic Administration';
        newUserDeptInput.placeholder = 'e.g. Examination / Registrar Cell';
      }
    });
  }

  const adminCreateUserForm = document.getElementById('adminCreateUserForm');
  if (adminCreateUserForm) {
    adminCreateUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const role = document.getElementById('newUserRole').value;
      const name = document.getElementById('newUserName').value.trim();
      const rawId = document.getElementById('newUserId').value.trim();
      const dept = document.getElementById('newUserDept').value.trim();
      const password = document.getElementById('newUserPassword').value.trim();

      if (!name || !rawId || !password) {
        showToast('⚠️ Please fill in all required fields (Name, User ID, and Password).', 'warning');
        return;
      }

      if (password.length < 4) {
        showToast('⚠️ Initial password must be at least 4 characters long.', 'warning');
        return;
      }

      // Check if User ID is already taken
      const existingUser = Object.values(db.users).find(u =>
        (u.loginId && u.loginId.toLowerCase() === rawId.toLowerCase()) ||
        (u.id && u.id.toLowerCase() === rawId.toLowerCase()) ||
        (u.roll && u.roll.toLowerCase() === rawId.toLowerCase()) ||
        (u.staffId && u.staffId.toLowerCase() === rawId.toLowerCase())
      );

      if (existingUser) {
        showToast(`❌ User ID "${rawId}" is already assigned to ${existingUser.name} (${existingUser.role.toUpperCase()})! Please enter a unique ID.`, 'danger');
        document.getElementById('newUserId').focus();
        return;
      }

      const adminUser = db.users[db.currentUserId];
      const adminName = adminUser ? adminUser.name : 'Dr. R.N. Sen (Registrar)';
      const timeInfo = getCurrentTimeInfo();

      // Normalized key
      const userKey = `${role}_${rawId.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now().toString().slice(-4)}`;

      const newUser = {
        id: userKey,
        loginId: rawId,
        role: role,
        name: name,
        password: password,
        passwordChanged: false,
        createdBy: `Administrator: ${adminName}`,
        createdAt: `${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}`,
        avatar: role === 'student' ? '👨‍🎓' : (role === 'faculty' ? '👩‍🏫' : (role === 'parent' ? '👪' : '👨‍💼'))
      };

      if (role === 'student') {
        newUser.roll = rawId;
        newUser.dept = dept || 'Computer Science & Engineering';
        newUser.sem = '5th Semester';
        newUser.attendance = 85;
        newUser.attendanceAttended = 34;
        newUser.attendanceSessionsTotal = 40;
        newUser.subjects = [
          { code: 'CS501', name: 'AI & Machine Learning', faculty: 'Prof. A.K. Sharma', attended: 9, total: 10, percentage: 90 },
          { code: 'CS502', name: 'Cloud Computing & DevOps', faculty: 'Dr. Priya Patel', attended: 8, total: 10, percentage: 80 },
          { code: 'CS503', name: 'Data Structures & Algorithms', faculty: 'Prof. A.K. Sharma', attended: 9, total: 10, percentage: 90 },
          { code: 'CS504', name: 'Database Management Systems', faculty: 'Prof. S. Mohanty', attended: 8, total: 10, percentage: 80 }
        ];
      } else if (role === 'faculty') {
        newUser.staffId = rawId;
        newUser.dept = dept || 'Computer Science & Engineering';
        newUser.designation = 'Assistant Professor';
      } else if (role === 'parent') {
        newUser.wardId = 'student1';
        newUser.wardName = 'Satyajit Mohapatra';
      } else if (role === 'admin') {
        newUser.staffId = rawId;
        newUser.dept = dept || 'Central Academic Administration';
        newUser.designation = 'Administrative Officer';
      }

      db.users[userKey] = newUser;
      persistDb();

      logActivity(
        'USER_PROVISION',
        `Administrator (${adminName}) created new user account: ${name} (Login ID: ${rawId}, Role: ${role.toUpperCase()}) with initial password "${password}".`,
        'admin'
      );

      adminCreateUserForm.reset();
      document.getElementById('newUserPassword').value = 'campus123';
      document.getElementById('newUserDept').value = '5th Semester • CSE';

      renderAdminUserDirectory();
      renderQuickLoginProfiles();

      showToast(`🎉 New user account created! ID: ${rawId} | Password: ${password} | Role: ${role.toUpperCase()}. User can now sign in and change their password.`, 'success');
    });
  }

  // ================= ADMINISTRATOR USER DIRECTORY & ROSTER =================
  const adminUserSearchInput = document.getElementById('adminUserSearchInput');
  let adminUserSearchFilter = '';

  if (adminUserSearchInput) {
    adminUserSearchInput.addEventListener('input', () => {
      adminUserSearchFilter = adminUserSearchInput.value.trim().toLowerCase();
      renderAdminUserDirectory();
    });
  }

  function renderAdminUserDirectory() {
    const tableBody = document.getElementById('adminUserDirectoryTableBody');
    const badge = document.getElementById('adminTotalUsersBadge');
    if (!tableBody) return;

    const allUsers = Object.values(db.users);
    if (badge) {
      const studentCount = allUsers.filter(u => u.role === 'student').length;
      const facultyCount = allUsers.filter(u => u.role === 'faculty').length;
      const adminCount = allUsers.filter(u => u.role === 'admin').length;
      const parentCount = allUsers.filter(u => u.role === 'parent').length;
      badge.textContent = `${allUsers.length} Active Accounts (${studentCount} Students, ${facultyCount} Faculty, ${adminCount} Admins, ${parentCount} Parents)`;
    }

    let filtered = allUsers;
    if (adminUserSearchFilter) {
      filtered = allUsers.filter(u => {
        const idStr = (u.loginId || u.roll || u.staffId || u.id || '').toLowerCase();
        const nameStr = (u.name || '').toLowerCase();
        const roleStr = (u.role || '').toLowerCase();
        const deptStr = (u.dept || u.wardName || '').toLowerCase();
        return idStr.includes(adminUserSearchFilter) ||
               nameStr.includes(adminUserSearchFilter) ||
               roleStr.includes(adminUserSearchFilter) ||
               deptStr.includes(adminUserSearchFilter);
      });
    }

    tableBody.innerHTML = '';
    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 1.5rem;">No accounts match "${adminUserSearchFilter}".</td></tr>`;
      return;
    }

    filtered.forEach(u => {
      const tr = document.createElement('tr');
      const displayId = u.loginId || u.roll || u.staffId || u.id;
      const isDefaultPwd = !u.passwordChanged;
      const pwdStatusHtml = isDefaultPwd
        ? `<span class="pwd-status-pill default">🔑 Default Admin Pass</span><div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Pass: <code>${u.password || 'campus123'}</code></div>`
        : `<span class="pwd-status-pill custom">🔒 Custom User Pass</span><div style="font-size:0.72rem; color:var(--brand-emerald); margin-top:2px;">Changed by user (${u.passwordChangedAt || 'Updated'})</div>`;

      let deptInfo = u.dept || '';
      if (u.role === 'student') deptInfo = `${u.roll || displayId} • ${u.sem || '5th Sem'} • ${u.dept || 'CSE'}`;
      else if (u.role === 'faculty') deptInfo = `${u.designation || 'Faculty'} • ${u.dept || 'Academic Dept'}`;
      else if (u.role === 'parent') deptInfo = `Guardian of ${u.wardName || 'Student'}`;
      else if (u.role === 'admin') deptInfo = `${u.designation || 'Registrar'} • ${u.dept || 'Central Admin'}`;

      tr.innerHTML = `
        <td>
          <span class="user-id-code">${displayId}</span>
          <small class="text-muted d-block" style="font-size:0.7rem; margin-top:3px;">Created: ${u.createdAt || 'Admin'}</small>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span>${u.avatar || '👤'}</span>
            <strong>${u.name}</strong>
          </div>
        </td>
        <td>
          <span class="status-role-badge role-${u.role}" style="font-size:0.7rem; padding:2px 6px;">${u.role.toUpperCase()}</span>
        </td>
        <td><small class="text-muted">${deptInfo}</small></td>
        <td>${pwdStatusHtml}</td>
        <td>
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
            <button class="btn btn-xs btn-outline btn-admin-reset-pwd" data-user-id="${u.id}" title="Reset this user's password">🔑 Reset Pass</button>
            <button class="btn btn-xs btn-primary btn-admin-impersonate" data-user-id="${u.id}" title="Sign in as this user to test access">🚀 Test Login</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // Reset password button handlers
    tableBody.querySelectorAll('.btn-admin-reset-pwd').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid = btn.dataset.userId;
        openAdminResetPasswordModal(uid);
      });
    });

    // Impersonate / test login button handlers
    tableBody.querySelectorAll('.btn-admin-impersonate').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid = btn.dataset.userId;
        const target = db.users[uid];
        if (target) {
          showToast(`Admin launching test session for ${target.name} (${target.role.toUpperCase()})...`, 'info');
          performLogin(uid);
        }
      });
    });
  }

  // Administrator Password Reset Modal Handlers
  const adminResetPasswordModal = document.getElementById('adminResetPasswordModal');
  const adminResetPasswordForm = document.getElementById('adminResetPasswordForm');
  const adminResetTargetDisplay = document.getElementById('adminResetTargetDisplay');
  const adminResetTargetUserId = document.getElementById('adminResetTargetUserId');
  const adminNewTempPassword = document.getElementById('adminNewTempPassword');
  const btnAdminGenerateRandomPwd = document.getElementById('btnAdminGenerateRandomPwd');

  function openAdminResetPasswordModal(uid) {
    const user = db.users[uid];
    if (!user) return;

    if (adminResetTargetDisplay) {
      const idTag = user.loginId || user.roll || user.staffId || user.id;
      adminResetTargetDisplay.textContent = `${user.name} (ID: ${idTag}) • Role: ${user.role.toUpperCase()}`;
    }
    if (adminResetTargetUserId) adminResetTargetUserId.value = uid;
    if (adminNewTempPassword) adminNewTempPassword.value = 'campus123';

    openModal(adminResetPasswordModal);
  }

  if (btnAdminGenerateRandomPwd && adminNewTempPassword) {
    btnAdminGenerateRandomPwd.addEventListener('click', () => {
      const randomWords = ['Campus', 'Smart', 'Tiger', 'Falcon', 'Beacon', 'Atlas'];
      const word = randomWords[Math.floor(Math.random() * randomWords.length)];
      const num = Math.floor(100 + Math.random() * 900);
      adminNewTempPassword.value = `${word}@${num}`;
      showToast('Generated random temporary password!', 'info');
    });
  }

  if (adminResetPasswordForm) {
    adminResetPasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const uid = adminResetTargetUserId.value;
      const user = db.users[uid];
      if (!user) return;

      const newTempPwd = adminNewTempPassword.value.trim();
      if (!newTempPwd) {
        showToast('⚠️ Please specify a temporary password.', 'warning');
        return;
      }

      user.password = newTempPwd;
      user.passwordChanged = false; // Reset to default status
      const timeInfo = getCurrentTimeInfo();
      persistDb();

      logActivity(
        'SECURITY',
        `Administrator reset password for user ${user.name} (ID: ${user.loginId || user.roll || user.staffId || user.id}) to temporary password "${newTempPwd}".`,
        'admin'
      );

      closeModal(adminResetPasswordModal);
      renderAdminUserDirectory();
      renderQuickLoginProfiles();
      showToast(`🔑 Password for ${user.name} reset to "${newTempPwd}". User can sign in and change it!`, 'success');
    });
  }

  const btnAdminScrollUserDirectory = document.getElementById('btnAdminScrollUserDirectory');
  if (btnAdminScrollUserDirectory) {
    btnAdminScrollUserDirectory.addEventListener('click', () => {
      const el = document.getElementById('adminUserDirectoryCard');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ================= SELF-SERVICE CHANGE PASSWORD FOR USERS =================
  const changePasswordModal = document.getElementById('changePasswordModal');
  const selfChangePasswordForm = document.getElementById('selfChangePasswordForm');
  const currentPasswordInput = document.getElementById('currentPasswordInput');
  const newPasswordInput = document.getElementById('newPasswordInput');
  const confirmPasswordInput = document.getElementById('confirmPasswordInput');
  const pwdStrengthMeter = document.getElementById('pwdStrengthMeter');
  const pwdStrengthText = document.getElementById('pwdStrengthText');
  const changePwdUserDisplay = document.getElementById('changePwdUserDisplay');

  function openChangePasswordModal() {
    const user = db.users[db.currentUserId];
    if (!user) {
      showToast('⚠️ Please sign in first to change your password.', 'warning');
      const portalsElem = document.getElementById('portals');
      if (portalsElem) portalsElem.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (userDropdownMenu) userDropdownMenu.style.display = 'none';

    if (changePwdUserDisplay) {
      const idTag = user.loginId || user.roll || user.staffId || user.id;
      changePwdUserDisplay.innerHTML = `${user.name} (${idTag}) • <span class="badge-role-tag">${user.role.toUpperCase()}</span>`;
    }

    if (selfChangePasswordForm) selfChangePasswordForm.reset();
    if (pwdStrengthMeter) {
      pwdStrengthMeter.style.width = '0%';
      pwdStrengthMeter.style.background = 'transparent';
    }
    if (pwdStrengthText) {
      pwdStrengthText.textContent = user.passwordChanged 
        ? 'Enter your existing password and choose a secure new password.'
        : 'You are currently using the default password created by the Administrator. Choose a secure new password below.';
    }

    openModal(changePasswordModal);
  }

  const dropdownChangePasswordBtn = document.getElementById('dropdownChangePasswordBtn');
  if (dropdownChangePasswordBtn) dropdownChangePasswordBtn.addEventListener('click', openChangePasswordModal);

  const btnStatusBarChangePassword = document.getElementById('btnStatusBarChangePassword');
  if (btnStatusBarChangePassword) btnStatusBarChangePassword.addEventListener('click', openChangePasswordModal);

  const openChangePasswordModalBtn = document.getElementById('openChangePasswordModalBtn');
  if (openChangePasswordModalBtn) openChangePasswordModalBtn.addEventListener('click', openChangePasswordModal);

  const btnFacultyChangePassword = document.getElementById('btnFacultyChangePassword');
  if (btnFacultyChangePassword) btnFacultyChangePassword.addEventListener('click', openChangePasswordModal);

  const btnParentChangePassword = document.getElementById('btnParentChangePassword');
  if (btnParentChangePassword) btnParentChangePassword.addEventListener('click', openChangePasswordModal);

  if (newPasswordInput && pwdStrengthMeter && pwdStrengthText) {
    newPasswordInput.addEventListener('input', () => {
      const val = newPasswordInput.value;
      if (!val) {
        pwdStrengthMeter.style.width = '0%';
        pwdStrengthText.textContent = 'Password must be at least 6 characters.';
        return;
      }

      let score = 0;
      if (val.length >= 6) score += 1;
      if (val.length >= 8) score += 1;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score += 1;
      if (/[0-9]/.test(val)) score += 1;
      if (/[^A-Za-z0-9]/.test(val)) score += 1;

      if (val.length < 6) {
        pwdStrengthMeter.style.width = '25%';
        pwdStrengthMeter.style.background = 'var(--brand-rose)';
        pwdStrengthText.textContent = 'Too short (minimum 6 characters required).';
      } else if (score <= 2) {
        pwdStrengthMeter.style.width = '50%';
        pwdStrengthMeter.style.background = 'var(--brand-amber)';
        pwdStrengthText.textContent = 'Fair: Add numbers or symbols to strengthen.';
      } else if (score <= 4) {
        pwdStrengthMeter.style.width = '75%';
        pwdStrengthMeter.style.background = 'var(--brand-cyan)';
        pwdStrengthText.textContent = 'Good password: Nice balance of characters.';
      } else {
        pwdStrengthMeter.style.width = '100%';
        pwdStrengthMeter.style.background = 'var(--brand-emerald)';
        pwdStrengthText.textContent = 'Strong password: High security grade.';
      }
    });
  }

  if (selfChangePasswordForm) {
    selfChangePasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = db.users[db.currentUserId];
      if (!user) {
        showToast('⚠️ No active user session.', 'warning');
        return;
      }

      const currentPwd = currentPasswordInput.value;
      const newPwd = newPasswordInput.value;
      const confirmPwd = confirmPasswordInput.value;

      const activeActualPwd = user.password || 'campus123';
      if (currentPwd !== activeActualPwd) {
        showToast('❌ Current password is incorrect! Please verify and re-enter.', 'danger');
        currentPasswordInput.focus();
        return;
      }

      if (newPwd.length < 6) {
        showToast('❌ New password must be at least 6 characters long.', 'danger');
        newPasswordInput.focus();
        return;
      }

      if (newPwd === currentPwd) {
        showToast('⚠️ New password cannot be the same as your current password.', 'warning');
        newPasswordInput.focus();
        return;
      }

      if (newPwd !== confirmPwd) {
        showToast('❌ Confirm password does not match the new password.', 'danger');
        confirmPasswordInput.focus();
        return;
      }

      const timeInfo = getCurrentTimeInfo();
      user.password = newPwd;
      user.passwordChanged = true;
      user.passwordChangedAt = `${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}`;
      persistDb();

      logActivity(
        'SECURITY',
        `User ${user.name} (${user.role.toUpperCase()}, ID: ${user.loginId || user.roll || user.staffId || user.id}) successfully updated their institutional account password on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`,
        'login'
      );

      closeModal(changePasswordModal);
      selfChangePasswordForm.reset();

      showToast(`🔒 Password updated successfully for ${user.name}! Please remember your new password for subsequent logins.`, 'success');

      renderAdminUserDirectory();
      renderQuickLoginProfiles();
    });
  }

  // ================= ACTIVITY HISTORY & AUDIT TRAIL MODAL =================
  const activityHistoryModal = document.getElementById('activityHistoryModal');
  const btnOpenHistoryModal = document.getElementById('btnOpenHistoryModal');
  const historyTimelineList = document.getElementById('historyTimelineList');
  let currentFilterRole = 'all';
  let currentFilterAction = 'all';

  if (btnOpenHistoryModal) btnOpenHistoryModal.addEventListener('click', () => openHistoryModal());
  if (dropdownViewHistoryBtn) {
    dropdownViewHistoryBtn.addEventListener('click', () => {
      userDropdownMenu.style.display = 'none';
      openHistoryModal();
    });
  }

  const btnLoginSectionViewHistory = document.getElementById('btnLoginSectionViewHistory');
  if (btnLoginSectionViewHistory) btnLoginSectionViewHistory.addEventListener('click', () => openHistoryModal());

  const btnStatusBarViewHistory = document.getElementById('btnStatusBarViewHistory');
  if (btnStatusBarViewHistory) btnStatusBarViewHistory.addEventListener('click', () => openHistoryModal());

  function openHistoryModal() {
    renderHistoryTimeline();
    openModal(activityHistoryModal);
  }

  document.querySelectorAll('#historyRoleFilters .hist-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#historyRoleFilters .hist-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilterRole = btn.dataset.filterRole;
      renderHistoryTimeline();
    });
  });

  document.querySelectorAll('#historyActionFilters .hist-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#historyActionFilters .hist-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilterAction = btn.dataset.filterAction;
      renderHistoryTimeline();
    });
  });

  function renderHistoryTimeline() {
    if (!historyTimelineList) return;
    historyTimelineList.innerHTML = '';

    let items = db.activityHistory;
    if (currentFilterRole !== 'all') {
      items = items.filter(it => it.actorRole.toLowerCase() === currentFilterRole.toLowerCase());
    }
    if (currentFilterAction !== 'all') {
      items = items.filter(it => it.actionType === currentFilterAction);
    }

    if (items.length === 0) {
      historyTimelineList.innerHTML = `<div class="text-center text-muted" style="padding: 2rem;">No activity logs match the selected filter.</div>`;
      return;
    }

    items.forEach(it => {
      const card = document.createElement('div');
      card.className = 'timeline-card';
      card.innerHTML = `
        <div class="timeline-time-col">
          <span class="timeline-day">${it.timeInfo.day}</span>
          <span class="timeline-date">${it.timeInfo.date}</span>
          <span class="timeline-hour">🕒 ${it.timeInfo.time}</span>
        </div>
        <div class="timeline-content-col">
          <div class="timeline-badge-row">
            <span class="action-type-pill ${it.badgeColor}">${it.actionType.replace('_', ' ')}</span>
            <span class="actor-pill">${it.actorRole}: <strong>${it.actorName}</strong></span>
          </div>
          <p class="timeline-desc">${it.description}</p>
        </div>
      `;
      historyTimelineList.appendChild(card);
    });
  }

  const btnExportHistoryLogs = document.getElementById('btnExportHistoryLogs');
  if (btnExportHistoryLogs) {
    btnExportHistoryLogs.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db.activityHistory, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `smart_campus_audit_history_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Audit history downloaded as JSON!', 'success');
    });
  }

  // ================= GATE PASS MODAL =================
  const gatePassModal = document.getElementById('gatePassModal');
  const gatePassForm = document.getElementById('gatePassForm');
  const btnOpenGatePass = document.getElementById('openGatePassModalBtn');
  const btnCardApplyPass = document.getElementById('cardApplyPassBtn');
  const btnViewFullPass = document.getElementById('viewFullPassModalBtn');

  if (btnOpenGatePass) btnOpenGatePass.addEventListener('click', () => openModal(gatePassModal));
  if (btnCardApplyPass) btnCardApplyPass.addEventListener('click', () => openModal(gatePassModal));
  if (btnViewFullPass) btnViewFullPass.addEventListener('click', () => openModal(gatePassModal));

  if (gatePassForm) {
    gatePassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentUser = db.users[db.currentUserId];
      if (!currentUser || currentUser.role !== 'student') {
        showToast('Only students can submit a gate pass. Please switch to a student profile.', 'danger');
        return;
      }

      const passType = document.getElementById('passTypeSelect').value;
      const outTime = document.getElementById('outTimeInput').value;
      const inTime = document.getElementById('inTimeInput').value;
      const reason = document.getElementById('passReasonInput').value;
      const timeInfo = getCurrentTimeInfo();

      const newPass = {
        id: 'GP-' + Math.floor(1000 + Math.random() * 9000),
        studentId: currentUser.id,
        studentName: currentUser.name,
        roll: currentUser.roll,
        category: passType,
        reason: reason,
        outTime: outTime,
        inTime: inTime,
        status: 'Pending',
        appliedTimeInfo: timeInfo,
        reviewedBy: 'Awaiting Faculty Endorsement',
        reviewedTimeInfo: null
      };

      db.gatePasses.unshift(newPass);

      logActivity(
        'GATE_PASS',
        `Applied for ${passType} Gate Pass (#${newPass.id}) for "${reason}". Requested hours: ${outTime} - ${inTime} on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`,
        'gate'
      );

      persistDb();
      closeModal(gatePassModal);
      syncCurrentUserUI();

      showToast(`Pass #${newPass.id} submitted! Sent to faculty queue for approval.`, 'success');
    });
  }

  // ================= CERTIFICATES MODAL =================
  const certificateModal = document.getElementById('certificateModal');
  const btnOpenCertificates = document.getElementById('openCertificatesModalBtn');
  const facIssueCertificatesBtn = document.getElementById('facIssueCertificatesBtn');
  const certTypeSelect = document.getElementById('certTypeSelect');
  const certPurposeInput = document.getElementById('certPurposeInput');
  const certRenderedTitle = document.getElementById('certRenderedTitle');
  const certRenderedPurposeText = document.getElementById('certRenderedPurposeText');
  const btnPrintCertBtn = document.getElementById('btnPrintCertBtn');

  if (btnOpenCertificates) btnOpenCertificates.addEventListener('click', () => openModal(certificateModal));
  if (facIssueCertificatesBtn) facIssueCertificatesBtn.addEventListener('click', () => openModal(certificateModal));

  if (certTypeSelect) {
    certTypeSelect.addEventListener('change', () => {
      if (certRenderedTitle) certRenderedTitle.textContent = certTypeSelect.value.toUpperCase();
    });
  }

  if (certPurposeInput) {
    certPurposeInput.addEventListener('input', () => {
      if (certRenderedPurposeText) {
        certRenderedPurposeText.innerHTML = `This certificate is issued upon student's request for the specific purpose of <strong>${certPurposeInput.value || 'General Verification'}</strong>.`;
      }
    });
  }

  if (btnPrintCertBtn) {
    btnPrintCertBtn.addEventListener('click', () => {
      const timeInfo = getCurrentTimeInfo();
      logActivity('CERTIFICATE', `Downloaded verified official ${certTypeSelect.value} with digital seal & QR code on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'cert');
      showToast('Preparing verifiable certificate with cryptographic signature...', 'info');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  // ================= COMPLAINTS & GRIEVANCE TRACKER =================
  const complaintsModal = document.getElementById('complaintsModal');
  const btnOpenComplaints = document.getElementById('openComplaintsModalBtn');
  const newComplaintForm = document.getElementById('newComplaintForm');
  const ticketsList = document.getElementById('ticketsList');

  if (btnOpenComplaints) btnOpenComplaints.addEventListener('click', () => openModal(complaintsModal));

  if (newComplaintForm) {
    newComplaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = document.getElementById('complaintCategory').value;
      const sub = document.getElementById('complaintSubject').value;
      const urgency = document.getElementById('complaintUrgency').value;
      const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
      const timeInfo = getCurrentTimeInfo();

      const newTicket = document.createElement('div');
      newTicket.className = 'ticket-row';
      newTicket.innerHTML = `
        <div class="ticket-info">
          <strong>${ticketId}: ${sub}</strong>
          <small>Category: ${cat} • Urgency: ${urgency} • Logged: ${timeInfo.day}, ${timeInfo.time}</small>
        </div>
        <span class="status-pill status-progress">Logged</span>
      `;
      if (ticketsList) ticketsList.prepend(newTicket);

      logActivity('GRIEVANCE', `Submitted grievance ticket #${ticketId}: "${sub}" (${cat} • Urgency: ${urgency}) on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'grievance');
      persistDb();

      newComplaintForm.reset();
      showToast(`Grievance #${ticketId} submitted! Assigned to Campus Maintenance Works Dept.`, 'success');
    });
  }

  // ================= FACULTY ACTION TILES =================
  const facPostNoticeBtn = document.getElementById('facPostNoticeBtn');
  if (facPostNoticeBtn) {
    facPostNoticeBtn.addEventListener('click', () => {
      const title = prompt('Enter Notice Circular Title to broadcast to students:', 'Extra Revision Class for CSE-5th Sem on Sunday');
      if (title) {
        const timeInfo = getCurrentTimeInfo();
        logActivity('ATTENDANCE', `Broadcasted class notice circular "${title}" to CSE batches on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`, 'attendance');
        showToast(`Circular "${title}" broadcasted to students! Activity logged.`, 'success');
      }
    });
  }

  const facManageAttendanceBtn = document.getElementById('facManageAttendanceBtn');
  if (facManageAttendanceBtn) {
    facManageAttendanceBtn.addEventListener('click', () => {
      const regCard = document.getElementById('facultyLiveAttendanceRegisterCard');
      if (regCard) regCard.scrollIntoView({ behavior: 'smooth' });
      showToast('Scroll down to mark attendance live online!', 'info');
    });
  }

  const facApproveTimetableBtn = document.getElementById('facApproveTimetableBtn');
  if (facApproveTimetableBtn) {
    facApproveTimetableBtn.addEventListener('click', () => {
      renderTimetableDay(currentTimetableDay);
      openModal(timetableModal);
    });
  }

  const facApprovePassBtn = document.getElementById('facApprovePassBtn');
  if (facApprovePassBtn) {
    facApprovePassBtn.addEventListener('click', () => {
      const reqTable = document.getElementById('facultyRequestsTable');
      if (reqTable) reqTable.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ================= AI CAMPUS ASSISTANT =================
  const chatMessagesWindow = document.getElementById('chatMessagesWindow');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatInputField = document.getElementById('chatInputField');
  const clearChatBtn = document.getElementById('clearChatBtn');

  const knowledgeBase = [
    {
      keywords: ['event', 'events', 'symposium', 'hackathon'],
      response: `📅 Upcoming Campus Event: <strong>National AI & Robotics Symposium 2026</strong> on Sep 15 in the Main Auditorium, followed by the <strong>Inter-College Hackathon Prelims</strong> on Sep 22 in Innovation Hub Labs.`
    },
    {
      keywords: ['attendance', 'percentage', 'present', 'absent', 'shortage'],
      response: () => {
        const user = db.users[db.currentUserId] || db.users.student1;
        return `📊 <strong>${user.name}</strong>, your cumulative attendance is <strong>${user.attendance || 88}%</strong> (${user.attendanceAttended || 136}/${user.attendanceSessionsTotal || 154} classes held).<br>Minimum requirement is 75% for exam eligibility. You can view subject-wise breakdowns on your student dashboard.`;
      }
    },
    {
      keywords: ['gate pass', 'leave', 'permission', 'outing'],
      response: () => {
        const user = db.users[db.currentUserId] || db.users.student1;
        const pass = db.gatePasses.find(p => p.studentId === user.id);
        if (pass) {
          return `🎫 You have Gate Pass <strong>#${pass.id}</strong> (Status: <strong>${pass.status}</strong>) for "${pass.reason}". Permitted window: ${pass.outTime} - ${pass.inTime}.`;
        }
        return `🎫 To apply for a Gate Pass, click the <strong>Gate Pass</strong> tile on your student dashboard. Your request will be routed directly to Prof. Sharma for 1-click endorsement.`;
      }
    },
    {
      keywords: ['certificate', 'bonafide', 'tc', 'recommendation'],
      response: `📜 You can generate digitally signed Bonafide Certificates, Character Certificates, and Transfer Certificates instantly through the 'Certificates' module with a verifiable cryptographic QR seal.`
    },
    {
      keywords: ['time table', 'timetable', 'schedule', 'class', 'lecture'],
      response: `🕒 Next scheduled class: <strong>AI & Machine Learning Lab</strong> at <strong>02:00 PM</strong> in Lab 304, followed by <strong>Cloud Computing</strong> at 03:45 PM.`
    },
    {
      keywords: ['odia', 'ଉପସ୍ଥିତି', 'କେତେ'],
      response: () => {
        const user = db.users[db.currentUserId] || db.users.student1;
        return `ନମସ୍କାର ${user.name.split(' ')[0]}! 🙏 ଆପଣଙ୍କର ବର୍ତ୍ତମାନ ହାରାହାରି ଉପସ୍ଥିତି <strong>${user.attendance || 88}%</strong> ଅଛି। ଆପଣଙ୍କର ସମସ୍ତ କ୍ଲାସ୍ ନିର୍ଦ୍ଧାରିତ ସମୟରେ ଚାଲୁଅଛି।`;
      }
    },
    {
      keywords: ['hindi', 'गेट पास', 'अप्लाई', 'कैसे'],
      response: `नमस्ते! 🎫 डिजिटल गेट पास अप्लाई करने के लिए डैशबोर्ड पर <strong>Gate Pass</strong> टाइल दबाएं, समय और कारण भरें। प्रोफेसर शर्मा के अप्रूव करते ही आपका डिजिटल QR गेट पास तैयार हो जाएगा!`
    }
  ];

  function appendChatMessage(text, sender = 'bot') {
    if (!chatMessagesWindow) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    const avatar = sender === 'bot' ? '🤖' : '👤';

    msgDiv.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">
        <p>${text}</p>
      </div>
    `;

    chatMessagesWindow.appendChild(msgDiv);
    chatMessagesWindow.scrollTop = chatMessagesWindow.scrollHeight;
  }

  function handleAiQuery(queryText) {
    appendChatMessage(queryText, 'user');

    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let matchedResponse = null;

      for (const item of knowledgeBase) {
        if (item.keywords.some(k => lower.includes(k.toLowerCase()))) {
          matchedResponse = typeof item.response === 'function' ? item.response() : item.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `I found information related to "<em>${queryText}</em>" in the Smart Campus knowledge base. All procedures can be accessed directly from your role dashboard or via the campus helpdesk.`;
      }

      appendChatMessage(matchedResponse, 'bot');
    }, 400);
  }

  if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInputField.value.trim();
      if (!text) return;
      handleAiQuery(text);
      chatInputField.value = '';
    });
  }

  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      handleAiQuery(chip.dataset.prompt);
    });
  });

  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (chatMessagesWindow) {
        chatMessagesWindow.innerHTML = `
          <div class="chat-message bot">
            <div class="msg-avatar">🤖</div>
            <div class="msg-bubble">
              <p>Chat reset. Hello! How can I assist you with campus timetables, online attendance, gate passes, certificates, or mess facilities?</p>
            </div>
          </div>
        `;
      }
    });
  }

  // ================= GENERIC MODAL CONTROLS =================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.close;
      closeModal(document.getElementById(modalId));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Mobile QR Modal
  const btnMobilePreviewModal = document.getElementById('btnMobilePreviewModal');
  const mobilePreviewModal = document.getElementById('mobilePreviewModal');
  if (btnMobilePreviewModal && mobilePreviewModal) {
    btnMobilePreviewModal.addEventListener('click', () => {
      fetch('/api/network-info').then(r => r.json()).then(data => {
        if (data && data.ip) {
          const qrImg = document.getElementById('mobileQrImage');
          const httpInput = document.getElementById('mobileHttpUrlInput');
          const httpsInput = document.getElementById('mobileHttpsUrlInput');
          if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(data.httpUrl)}`;
          if (httpInput) httpInput.value = data.httpUrl;
          if (httpsInput) httpsInput.value = data.httpsUrl;
        }
      }).catch(() => {});
      openModal(mobilePreviewModal);
    });
  }

  document.querySelectorAll('.copy-url-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`, 'success');
      }).catch(() => {
        showToast(`URL: ${textToCopy}`, 'info');
      });
    });
  });

  // Notices Modal
  const noticesModal = document.getElementById('noticesModal');
  const openNoticesModalBtn = document.getElementById('openNoticesModalBtn');
  if (openNoticesModalBtn) openNoticesModalBtn.addEventListener('click', () => openModal(noticesModal));

  // Language Selector
  const localeSelect = document.getElementById('localeSelect');
  if (localeSelect) {
    localeSelect.addEventListener('change', (e) => {
      showToast(`Language set to ${e.target.options[e.target.selectedIndex].text}`, 'info');
    });
  }

  // Star Rating interactive click in mess preview
  document.querySelectorAll('#dashMessRatingStars span').forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.dataset.star;
      showToast(`Rated lunch ${rating}/5 stars. Thank you!`, 'success');
    });
  });

  // ================= MODAL 13: STUDENT FEEDBACK SYSTEM (FACULTY & CAMPUS) =================
  const feedbackModal = document.getElementById('feedbackModal');
  const openFeedbackModalBtn = document.getElementById('openFeedbackModalBtn');
  const facViewFeedbackBtn = document.getElementById('facViewFeedbackBtn');
  const btnAdminOpenFeedbackRadar = document.getElementById('btnAdminOpenFeedbackRadar');

  const tabFacultyFeedbackNav = document.getElementById('tabFacultyFeedbackNav');
  const tabCampusFeedbackNav = document.getElementById('tabCampusFeedbackNav');
  const tabHistoryFeedbackNav = document.getElementById('tabHistoryFeedbackNav');

  const panelFacultyFeedback = document.getElementById('panelFacultyFeedback');
  const panelCampusFeedback = document.getElementById('panelCampusFeedback');
  const panelHistoryFeedback = document.getElementById('panelHistoryFeedback');

  function openStudentFeedbackModal(initialTab = 'faculty') {
    if (initialTab === 'faculty') {
      activateFeedbackTab(tabFacultyFeedbackNav, panelFacultyFeedback);
    } else if (initialTab === 'campus') {
      activateFeedbackTab(tabCampusFeedbackNav, panelCampusFeedback);
    } else if (initialTab === 'history') {
      activateFeedbackTab(tabHistoryFeedbackNav, panelHistoryFeedback);
    }
    renderStudentFeedbackHistory();
    openModal(feedbackModal);
  }

  function activateFeedbackTab(btnToActive, panelToShow) {
    [tabFacultyFeedbackNav, tabCampusFeedbackNav, tabHistoryFeedbackNav].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
    [panelFacultyFeedback, panelCampusFeedback, panelHistoryFeedback].forEach(p => {
      if (p) p.style.display = 'none';
    });

    if (btnToActive) btnToActive.classList.add('active');
    if (panelToShow) panelToShow.style.display = 'block';
  }

  if (tabFacultyFeedbackNav && tabCampusFeedbackNav && tabHistoryFeedbackNav) {
    tabFacultyFeedbackNav.addEventListener('click', () => {
      activateFeedbackTab(tabFacultyFeedbackNav, panelFacultyFeedback);
    });
    tabCampusFeedbackNav.addEventListener('click', () => {
      activateFeedbackTab(tabCampusFeedbackNav, panelCampusFeedback);
    });
    tabHistoryFeedbackNav.addEventListener('click', () => {
      activateFeedbackTab(tabHistoryFeedbackNav, panelHistoryFeedback);
      renderStudentFeedbackHistory();
    });
  }

  if (openFeedbackModalBtn) {
    openFeedbackModalBtn.addEventListener('click', () => {
      openStudentFeedbackModal('faculty');
    });
  }

  if (facViewFeedbackBtn) {
    facViewFeedbackBtn.addEventListener('click', () => {
      const card = document.getElementById('facultyFeedbackCard');
      if (card) card.scrollIntoView({ behavior: 'smooth' });
      else openStudentFeedbackModal('faculty');
    });
  }

  if (btnAdminOpenFeedbackRadar) {
    btnAdminOpenFeedbackRadar.addEventListener('click', () => {
      const card = document.getElementById('adminFeedbackIntelligenceCard');
      if (card) card.scrollIntoView({ behavior: 'smooth' });
      else openStudentFeedbackModal('campus');
    });
  }

  // Submit Faculty Feedback Form
  const studentFacultyFeedbackForm = document.getElementById('studentFacultyFeedbackForm');
  if (studentFacultyFeedbackForm) {
    studentFacultyFeedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentUser = db.users[db.currentUserId] || db.users.student1;
      const courseSelect = document.getElementById('fbFacultyCourseSelect').value;
      const clarity = parseInt(document.getElementById('fbRatingClarity').value);
      const doubts = parseInt(document.getElementById('fbRatingDoubts').value);
      const labs = parseInt(document.getElementById('fbRatingLabs').value);
      const fairness = parseInt(document.getElementById('fbRatingFairness').value);
      const comments = document.getElementById('fbFacultyComments').value.trim();
      const isAnon = document.getElementById('fbAnonymousCheck').checked;

      const avgScore = parseFloat(((clarity + doubts + labs + fairness) / 4).toFixed(1));
      const timeInfo = getCurrentTimeInfo();

      const newFeedback = {
        id: 'FB-' + Math.floor(100 + Math.random() * 900),
        type: 'FACULTY',
        category: courseSelect,
        targetName: courseSelect.split('|')[0].trim(),
        studentId: currentUser.id,
        studentDisplay: isAnon ? `Anonymous Student (${currentUser.sem || 'CSE Sem 5'})` : `${currentUser.name} (${currentUser.roll})`,
        isAnonymous: isAnon,
        rating: avgScore,
        ratingsDetail: { clarity, doubts, labs, fairness },
        comments: comments,
        date: timeInfo.date,
        time: timeInfo.time,
        status: 'Verified by Dean Academic'
      };

      db.feedbackList.unshift(newFeedback);

      logActivity(
        'FEEDBACK',
        `Student submitted faculty appraisal for ${courseSelect.split('|')[0].trim()} (Rating: ${avgScore}/5.0 • "${comments.slice(0, 50)}..."). Confidential evaluation recorded on ${timeInfo.day}, ${timeInfo.date} at ${timeInfo.time}.`,
        'cert'
      );

      persistDb();
      studentFacultyFeedbackForm.reset();
      renderFacultyFeedbackView();
      renderAdminFeedbackRadar();
      renderStudentFeedbackHistory();

      showToast(`Thank you! Your teaching appraisal for ${courseSelect.split('|')[0].trim()} has been submitted.`, 'success');
      activateFeedbackTab(tabHistoryFeedbackNav, panelHistoryFeedback);
    });
  }

  // Submit Campus Facility Feedback Form
  const studentCampusFeedbackForm = document.getElementById('studentCampusFeedbackForm');
  if (studentCampusFeedbackForm) {
    studentCampusFeedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentUser = db.users[db.currentUserId] || db.users.student1;
      const domain = document.getElementById('fbCampusDomainSelect').value;
      const location = document.getElementById('fbFacilityLocation').value.trim();
      const rating = parseInt(document.getElementById('fbCampusRating').value);
      const remarks = document.getElementById('fbCampusRemarks').value.trim();
      const isUrgent = document.getElementById('fbCampusUrgentFlag').checked;
      const timeInfo = getCurrentTimeInfo();

      const newFeedback = {
        id: 'FB-' + Math.floor(100 + Math.random() * 900),
        type: 'CAMPUS',
        category: domain,
        targetName: domain,
        studentId: currentUser.id,
        studentDisplay: `${currentUser.name} (${currentUser.roll})`,
        isAnonymous: false,
        rating: rating,
        location: location,
        isUrgent: isUrgent,
        comments: remarks,
        date: timeInfo.date,
        time: timeInfo.time,
        status: isUrgent ? 'Assigned to Campus Works Dept (High Priority)' : 'Acknowledged by Infrastructure Committee'
      };

      db.feedbackList.unshift(newFeedback);

      // If marked urgent, also auto-create a grievance ticket
      if (isUrgent) {
        const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
        const ticketsList = document.getElementById('ticketsList');
        if (ticketsList) {
          const newTicket = document.createElement('div');
          newTicket.className = 'ticket-row';
          newTicket.innerHTML = `
            <div class="ticket-info">
              <strong>${ticketId}: Urgent Facility Issue - ${domain}</strong>
              <small>Location: ${location} • SLA: Resolution within 24h</small>
            </div>
            <span class="status-pill status-urgent">Urgent</span>
          `;
          ticketsList.prepend(newTicket);
        }
      }

      logActivity(
        'FEEDBACK',
        `Student submitted campus facility feedback for "${domain}" at ${location} (Rating: ${rating}/5.0 • "${remarks.slice(0, 50)}...").${isUrgent ? ' Flagged for immediate maintenance.' : ''}`,
        isUrgent ? 'grievance' : 'attendance'
      );

      persistDb();
      studentCampusFeedbackForm.reset();
      renderAdminFeedbackRadar();
      renderStudentFeedbackHistory();

      showToast(`Campus facility feedback for ${domain} recorded!`, 'success');
      activateFeedbackTab(tabHistoryFeedbackNav, panelHistoryFeedback);
    });
  }

  // Render Student History
  function renderStudentFeedbackHistory() {
    const list = document.getElementById('feedbackHistoryList');
    if (!list) return;
    list.innerHTML = '';

    const currentUser = db.users[db.currentUserId] || db.users.student1;
    const studentItems = db.feedbackList.filter(f => f.studentId === currentUser.id);

    if (studentItems.length === 0) {
      list.innerHTML = `<div class="text-center text-muted" style="padding: 1.5rem;">You haven't submitted any course appraisals or campus feedback yet.</div>`;
      return;
    }

    studentItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'feedback-hist-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <div>
            <span class="badge-role-tag">${item.type}</span>
            <strong style="margin-left: 0.35rem; font-size: 0.88rem;">${item.category}</strong>
          </div>
          <span class="status-pill status-approved" style="font-size: 0.72rem;">${item.status}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; font-size: 0.82rem;">
          <span class="star-val">⭐ ${item.rating} / 5.0</span>
          ${item.isAnonymous ? '<small class="text-muted">(Submitted Anonymously)</small>' : ''}
          ${item.location ? `<small class="text-muted">• Location: ${item.location}</small>` : ''}
        </div>
        <p style="margin: 0; font-size: 0.84rem; color: var(--text-main); font-style: italic;">"${item.comments}"</p>
        <small class="text-muted d-block mt-2" style="font-size: 0.74rem;">Logged on ${item.date} at ${item.time}</small>
      `;
      list.appendChild(card);
    });
  }

  // Render Faculty View
  function renderFacultyFeedbackView() {
    const list = document.getElementById('facStudentRemarksList');
    if (!list) return;
    list.innerHTML = '';

    const facultyItems = db.feedbackList.filter(f => f.type === 'FACULTY');
    if (facultyItems.length === 0) {
      list.innerHTML = `<div class="text-muted" style="padding: 0.75rem;">No student appraisals submitted yet for this semester.</div>`;
      return;
    }

    facultyItems.slice(0, 3).forEach(item => {
      const bubble = document.createElement('div');
      bubble.className = 'remark-bubble';
      bubble.innerHTML = `
        <div class="remark-header">
          <span class="badge-role-tag">${item.courseCode || 'CS501'}</span>
          <span class="star-val">⭐ ${item.rating} / 5.0</span>
          <small class="text-muted" style="margin-left: auto;">${item.date}</small>
        </div>
        <p class="remark-body">"${item.comments}"</p>
      `;
      list.appendChild(bubble);
    });
  }

  // Render Admin Feedback Intelligence Radar
  function renderAdminFeedbackRadar() {
    const feed = document.getElementById('adminFeedbackFeedList');
    if (!feed) return;
    feed.innerHTML = '';

    const recent = db.feedbackList.slice(0, 4);
    recent.forEach(item => {
      const isPositive = item.rating >= 4;
      const div = document.createElement('div');
      div.className = 'admin-feed-item';
      div.innerHTML = `
        <span class="badge-role-tag">${item.type}: ${item.type === 'FACULTY' ? (item.courseCode || 'TEACHING') : 'CAMPUS'}</span>
        <span class="sentiment-pill ${isPositive ? 'positive' : 'attention'}">⭐ ${item.rating}/5 ${isPositive ? 'Positive' : 'Needs Action'}</span>
        <p class="feed-text">"${item.comments}"</p>
        <small class="text-muted">${item.studentDisplay} • ${item.date} at ${item.time}</small>
      `;
      feed.appendChild(div);
    });
  }

  // Initial Sync
  renderQuickLoginProfiles();
  renderAdminUserDirectory();
  syncCurrentUserUI();
  updateHistoryCountBadge();

  console.log('Smart Campus V3 Client Engine initialized with live attendance register & full campus lifecycle.');
});
