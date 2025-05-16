export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: Role;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface SystemSettings {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
}

export interface AcademicReportData {
  id: number;
  courseId: string;
  courseName: string;
  semester: string;
  totalStudents: number;
  passRate: number;
  averageGrade: number;
  highestGrade: number;
  lowestGrade: number;
}

export interface CourseAttendance {
  name: string;
  attendance: number;
}

export interface AttendanceData {
  id: number;
  month: string;
  totalClasses: number;
  averageAttendance: number;
  courses: CourseAttendance[];
}

export interface CoursePerformance {
  name: string;
  grade: string;
  attendance: number;
}

export interface StudentData {
  id: number;
  studentId: string;
  name: string;
  enrollmentStatus: string;
  courses: CoursePerformance[];
  gpa: number;
  attendanceRate: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'all',
    description: 'Full system access',
    module: 'system',
  },
  {
    id: '2',
    name: 'view_inmates',
    description: 'View inmate information',
    module: 'inmates',
  },
  {
    id: '3',
    name: 'manage_attendance',
    description: 'Manage inmate attendance',
    module: 'attendance',
  },
  {
    id: '4',
    name: 'view_reports',
    description: 'View system reports',
    module: 'reports',
  },
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    permissions: [mockPermissions[0]],
    description: 'Full system access',
  },
  {
    id: '2',
    name: 'Guard',
    permissions: [mockPermissions[1], mockPermissions[2]],
    description: 'Prison guard with limited access',
  },
  {
    id: '3',
    name: 'Staff',
    permissions: [mockPermissions[1], mockPermissions[3]],
    description: 'General staff member',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@prison.com',
    fullName: 'System Administrator',
    role: mockRoles[0],
    status: 'active',
    lastLogin: '2024-03-20T10:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    username: 'guard1',
    email: 'guard1@prison.com',
    fullName: 'John Guard',
    role: mockRoles[1],
    status: 'active',
    lastLogin: '2024-03-19T15:30:00Z',
    createdAt: '2024-01-02T00:00:00Z',
  },
  // Add more mock users as needed
];

export const mockSettings: SystemSettings[] = [
  {
    id: '1',
    key: 'system_name',
    value: 'Prison Management System',
    description: 'Name of the system displayed in UI',
    category: 'general',
  },
  {
    id: '2',
    key: 'maintenance_mode',
    value: 'false',
    description: 'Enable/disable system maintenance mode',
    category: 'system',
  },
  {
    id: '3',
    key: 'session_timeout',
    value: '30',
    description: 'Session timeout in minutes',
    category: 'security',
  },
];

export const academicReportData: AcademicReportData[] = [
  {
    id: 1,
    courseId: 'CS101',
    courseName: 'Introduction to Programming',
    semester: 'Fall 2023',
    totalStudents: 45,
    passRate: 87.5,
    averageGrade: 3.4,
    highestGrade: 4.0,
    lowestGrade: 2.1
  },
  {
    id: 2,
    courseId: 'CS102',
    courseName: 'Database Management',
    semester: 'Fall 2023',
    totalStudents: 38,
    passRate: 92.1,
    averageGrade: 3.6,
    highestGrade: 4.0,
    lowestGrade: 2.3
  },
  {
    id: 3,
    courseId: 'CS103',
    courseName: 'Web Development',
    semester: 'Fall 2023',
    totalStudents: 42,
    passRate: 89.3,
    averageGrade: 3.5,
    highestGrade: 4.0,
    lowestGrade: 2.0
  }
];

export const attendanceReportData: AttendanceData[] = [
  {
    id: 1,
    month: 'January 2024',
    totalClasses: 22,
    averageAttendance: 92.5,
    courses: [
      { name: 'Introduction to Programming', attendance: 94.2 },
      { name: 'Database Management', attendance: 91.8 },
      { name: 'Web Development', attendance: 89.5 }
    ]
  },
  {
    id: 2,
    month: 'February 2024',
    totalClasses: 20,
    averageAttendance: 91.8,
    courses: [
      { name: 'Introduction to Programming', attendance: 93.1 },
      { name: 'Database Management', attendance: 92.5 },
      { name: 'Web Development', attendance: 90.2 }
    ]
  },
  {
    id: 3,
    month: 'March 2024',
    totalClasses: 23,
    averageAttendance: 93.2,
    courses: [
      { name: 'Introduction to Programming', attendance: 95.0 },
      { name: 'Database Management', attendance: 93.1 },
      { name: 'Web Development', attendance: 91.5 }
    ]
  }
];

export const studentReportData: StudentData[] = [
  {
    id: 1,
    studentId: 'STU001',
    name: 'John Doe',
    enrollmentStatus: 'Active',
    courses: [
      { name: 'Introduction to Programming', grade: 'A', attendance: 95 },
      { name: 'Database Management', grade: 'B+', attendance: 88 },
      { name: 'Web Development', grade: 'A-', attendance: 92 }
    ],
    gpa: 3.7,
    attendanceRate: 91.6
  },
  {
    id: 2,
    studentId: 'STU002',
    name: 'Jane Smith',
    enrollmentStatus: 'Active',
    courses: [
      { name: 'Introduction to Programming', grade: 'B', attendance: 89 },
      { name: 'Database Management', grade: 'A', attendance: 94 },
      { name: 'Web Development', grade: 'B+', attendance: 91 }
    ],
    gpa: 3.4,
    attendanceRate: 91.3
  },
  {
    id: 3,
    studentId: 'STU003',
    name: 'Michael Johnson',
    enrollmentStatus: 'Active',
    courses: [
      { name: 'Introduction to Programming', grade: 'A-', attendance: 93 },
      { name: 'Database Management', grade: 'A', attendance: 96 },
      { name: 'Web Development', grade: 'A', attendance: 95 }
    ],
    gpa: 3.9,
    attendanceRate: 94.7
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Course Added',
    message: 'A new course "Advanced Mathematics" has been added to the curriculum.',
    type: 'info',
    timestamp: '2024-03-21T09:30:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Low Attendance Alert',
    message: 'Several students have below 75% attendance in "Web Development" course.',
    type: 'warning',
    timestamp: '2024-03-21T08:15:00Z',
    read: false
  },
  {
    id: '3',
    title: 'Grade Update',
    message: 'Mid-term grades have been posted for "Introduction to Programming".',
    type: 'success',
    timestamp: '2024-03-20T16:45:00Z',
    read: true
  }
]; 