import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';
import AcademicReport from '../components/reports/AcademicReport';
import AttendanceReport from '../components/reports/AttendanceReport';
import StudentReport from '../components/reports/StudentReport';

// Lazy-loaded components
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const NotFound = lazy(() => import('../features/common/NotFound'));

// Student routes
const StudentList = lazy(() => import('../features/students/StudentList'));
const StudentRegistration = lazy(() => import('../features/students/StudentRegistration'));
const StudentDetails = lazy(() => import('../features/students/StudentDetails'));
const InmateStudents = lazy(() => import('../features/students/InmateStudents'));

// Member routes
const MemberList = lazy(() => import('../features/members/MemberList'));
const MemberRegistration = lazy(() => import('../features/members/MemberRegistration'));
const MemberDetails = lazy(() => import('../features/members/MemberDetails'));

// Teacher routes
const TeacherList = lazy(() => import('../features/teachers/TeacherList'));
const TeacherForm = lazy(() => import('../features/teachers/TeacherForm'));
const TeacherAssignments = lazy(() => import('../features/teachers/TeacherAssignments'));

// Course routes
const CourseList = lazy(() => import('../features/courses/CourseList'));
const CourseForm = lazy(() => import('../features/courses/CourseForm'));
const Curriculum = lazy(() => import('../features/courses/Curriculum'));

// Exam routes
const ExamList = lazy(() => import('../features/exams/ExamList'));
const ExamCreate = lazy(() => import('../features/exams/ExamCreate'));
const ExamResults = lazy(() => import('../features/exams/ExamResults'));

// Grade and attendance routes
const GradeManagement = lazy(() => import('../features/grades/GradeManagement'));
const AttendanceManagement = lazy(() => import('../features/attendance/AttendanceManagement'));

// Admin routes
const AdminLayout = lazy(() => import('../features/admin/components/AdminLayout'));

// Report routes
const AcademicReports = lazy(() => import('../features/reports/AcademicReports'));
const AttendanceReports = lazy(() => import('../features/reports/AttendanceReports'));
const StudentReports = lazy(() => import('../features/reports/StudentReports'));

// Profile and settings
const UserProfile = lazy(() => import('../features/profile/UserProfile'));
const AppSettings = lazy(() => import('../features/profile/AppSettings'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Student routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/register" element={<StudentRegistration />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/inmates" element={<InmateStudents />} />
        
        {/* Member routes */}
        <Route path="/members" element={<MemberList />} />
        <Route path="/members/register" element={<MemberRegistration />} />
        <Route path="/members/:id" element={<MemberDetails />} />
        
        {/* Teacher routes */}
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teachers/add" element={<TeacherForm />} />
        <Route path="/teachers/edit/:id" element={<TeacherForm />} />
        <Route path="/teachers/assignments" element={<TeacherAssignments />} />
        
        {/* Course routes */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/add" element={<CourseForm />} />
        <Route path="/courses/edit/:id" element={<CourseForm />} />
        <Route path="/courses/curriculum" element={<Curriculum />} />
        
        {/* Exam routes */}
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/create" element={<ExamCreate />} />
        <Route path="/exams/results" element={<ExamResults />} />
        
        {/* Grade & Attendance */}
        <Route path="/grades" element={<GradeManagement />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Report routes */}
        <Route path="/reports/academic" element={<AcademicReport />} />
        <Route path="/reports/attendance" element={<AttendanceReport />} />
        <Route path="/reports/students" element={<StudentReport />} />
        
        {/* Profile & Settings */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<AppSettings />} />
        
        {/* Fallback routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;