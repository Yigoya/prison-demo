import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users, GraduationCap, BookOpen, Calendar, BarChart2, User, FileText, UserCheck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockStudents } from '../../data/mockStudents';
import StatCard from './components/StatCard';
import ActivityLog from './components/ActivityLog';
import UpcomingEvents from './components/UpcomingEvents';
import QuickAccess from './components/QuickAccess';
import AttendanceChart from './components/AttendanceChart';
import StudentDistributionChart from './components/StudentDistributionChart';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    inmateStudents: 0,
    regularStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    attendanceRate: 0,
    pendingExams: 0,
    activeCourses: 0,
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      // Calculate statistics from mock data
      const inmateStudents = mockStudents.filter(student => student.isInmate).length;
      const regularStudents = mockStudents.filter(student => !student.isInmate).length;
      
      setStats({
        totalStudents: mockStudents.length,
        inmateStudents,
        regularStudents,
        totalTeachers: 24,
        totalCourses: 36,
        attendanceRate: 87,
        pendingExams: 5,
        activeCourses: 18,
      });
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Welcome message */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button 
            onClick={() => navigate('/students/register')}
            className="btn btn-primary flex items-center"
          >
            <PlusCircle size={16} className="mr-2" />
            {t('students.register')}
          </button>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title={t('dashboard.totalStudents')} 
          value={stats.totalStudents}
          icon={<Users className="text-blue-500" size={24} />}
          change="+12%"
          positive={true}
        />
        <StatCard 
          title={t('dashboard.totalTeachers')} 
          value={stats.totalTeachers}
          icon={<GraduationCap className="text-purple-500" size={24} />}
          change="+3%"
          positive={true}
        />
        <StatCard 
          title={t('dashboard.totalCourses')} 
          value={stats.totalCourses}
          icon={<BookOpen className="text-green-500" size={24} />}
          change="+5%"
          positive={true}
        />
        <StatCard 
          title={t('dashboard.attendanceRate')} 
          value={`${stats.attendanceRate}%`}
          icon={<UserCheck className="text-yellow-500" size={24} />}
          change="+2%"
          positive={true}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.inmateStats')}
          </h2>
          <StudentDistributionChart 
            inmateStudents={stats.inmateStudents}
            regularStudents={stats.regularStudents}
          />
        </div>
        
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('attendance.attendanceRate')}
          </h2>
          <AttendanceChart />
        </div>
      </div>
      
      {/* Bottom sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-5 border-b border-gray-200 dark:border-gray-700">
            {t('dashboard.quickLinks')}
          </h2>
          <QuickAccess />
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-5 border-b border-gray-200 dark:border-gray-700">
            {t('dashboard.recentActivity')}
          </h2>
          <ActivityLog />
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white p-5 border-b border-gray-200 dark:border-gray-700">
            {t('dashboard.upcomingEvents')}
          </h2>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;