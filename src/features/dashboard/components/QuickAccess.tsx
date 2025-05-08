import { Link } from 'react-router-dom';
import { UserPlus, BarChart2, UserCog, FileText, Check, ClipboardList, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const QuickAccess = () => {
  const { t } = useLanguage();
  
  const quickLinks = [
    {
      id: "1",
      title: t('students.register'),
      icon: <UserPlus size={20} className="text-primary" />,
      path: "/students/register",
      bgColor: "bg-primary-dark/10"
    },
    {
      id: "2",
      title: t('reports.title'),
      icon: <BarChart2 size={20} className="text-blue-600" />,
      path: "/reports/academic",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      id: "3",
      title: t('admin.users'),
      icon: <UserCog size={20} className="text-purple-600" />,
      path: "/admin/users",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      id: "4",
      title: t('exams.create'),
      icon: <FileText size={20} className="text-red-600" />,
      path: "/exams/create",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      id: "5",
      title: t('attendance.record'),
      icon: <Check size={20} className="text-green-600" />,
      path: "/attendance",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      id: "6",
      title: t('grades.enter'),
      icon: <ClipboardList size={20} className="text-yellow-600" />,
      path: "/grades",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      id: "7",
      title: t('students.list'),
      icon: <Users size={20} className="text-orange-600" />,
      path: "/students",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      id: "8",
      title: t('courses.list'),
      icon: <BookOpen size={20} className="text-teal-600" />,
      path: "/courses",
      bgColor: "bg-teal-100 dark:bg-teal-900/20"
    }
  ];

  return (
    <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {quickLinks.map((link) => (
        <Link
          key={link.id}
          to={link.path}
          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className={`h-10 w-10 rounded-full ${link.bgColor} flex items-center justify-center mb-2`}>
            {link.icon}
          </div>
          <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
            {link.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccess;