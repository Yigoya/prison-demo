import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy-loaded components
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const NotFound = lazy(() => import('../features/common/NotFound'));

// Student routes
const StudentList = lazy(() => import('../features/students/StudentList'));
const StudentRegistration = lazy(() => import('../features/students/StudentRegistration'));
const StudentDetails = lazy(() => import('../features/students/StudentDetails'));
const InmateStudents = lazy(() => import('../features/students/InmateStudents'));

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
const UserManagement = lazy(() => import('../features/admin/UserManagement'));
const RoleManagement = lazy(() => import('../features/admin/RoleManagement'));
const SystemSettings = lazy(() => import('../features/admin/SystemSettings'));

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
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/roles" element={<RoleManagement />} />
        <Route path="/admin/settings" element={<SystemSettings />} />
        
        {/* Report routes */}
        <Route path="/reports/academic" element={<AcademicReports />} />
        <Route path="/reports/attendance" element={<AttendanceReports />} />
        <Route path="/reports/students" element={<StudentReports />} />
        
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