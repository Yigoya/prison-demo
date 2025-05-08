import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap as Graduation, BookOpen, Award, CalendarCheck, UserCog, BarChart, FileText, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import logo from '../../assets/fpc-logo.png';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

type MenuItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  children?: { name: string; path: string }[];
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const menuSections: MenuSection[] = [
    {
      title: t('sidebar.main'),
      items: [
        {
          name: t('sidebar.dashboard'),
          path: '/',
          icon: <LayoutDashboard size={20} />,
        },
      ]
    },
    {
      title: t('sidebar.education'),
      items: [
        {
          name: t('sidebar.students'),
          path: '/students',
          icon: <Users size={20} />,
          children: [
            { name: t('sidebar.allStudents'), path: '/students' },
            { name: t('sidebar.registerStudent'), path: '/students/register' },
            { name: t('sidebar.inmateStudents'), path: '/students/inmates' },
          ]
        },
        {
          name: t('sidebar.teachers'),
          path: '/teachers',
          icon: <Graduation size={20} />,
          children: [
            { name: t('sidebar.allTeachers'), path: '/teachers' },
            { name: t('sidebar.addTeacher'), path: '/teachers/add' },
            { name: t('sidebar.assignments'), path: '/teachers/assignments' },
          ]
        },
        {
          name: t('sidebar.courses'),
          path: '/courses',
          icon: <BookOpen size={20} />,
          children: [
            { name: t('sidebar.allCourses'), path: '/courses' },
            { name: t('sidebar.addCourse'), path: '/courses/add' },
            { name: t('sidebar.curriculum'), path: '/courses/curriculum' },
          ]
        },
        {
          name: t('sidebar.exams'),
          path: '/exams',
          icon: <FileText size={20} />,
          children: [
            { name: t('sidebar.examsSchedule'), path: '/exams' },
            { name: t('sidebar.createExam'), path: '/exams/create' },
            { name: t('sidebar.examResults'), path: '/exams/results' },
          ]
        },
        {
          name: t('sidebar.grades'),
          path: '/grades',
          icon: <Award size={20} />,
        },
        {
          name: t('sidebar.attendance'),
          path: '/attendance',
          icon: <CalendarCheck size={20} />,
        },
      ]
    },
    {
      title: t('sidebar.admin'),
      items: [
        {
          name: t('sidebar.administration'),
          path: '/admin',
          icon: <UserCog size={20} />,
          children: [
            { name: t('sidebar.users'), path: '/admin/users' },
            { name: t('sidebar.roles'), path: '/admin/roles' },
            { name: t('sidebar.settings'), path: '/admin/settings' },
          ]
        },
        {
          name: t('sidebar.reports'),
          path: '/reports',
          icon: <BarChart size={20} />,
          children: [
            { name: t('sidebar.academicReports'), path: '/reports/academic' },
            { name: t('sidebar.attendanceReports'), path: '/reports/attendance' },
            { name: t('sidebar.studentReports'), path: '/reports/students' },
          ]
        },
      ]
    }
  ];

  // Filter sections based on user role
  const filteredSections = menuSections.filter(section => {
    if (section.title === t('sidebar.admin') && user?.role !== 'admin') {
      return false;
    }
    return true;
  });

  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary-dark">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="FPC Logo" className="h-8 w-8" />
            <span className="font-bold text-lg">{t('common.appShortName')}</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-white/70 hover:text-white focus:outline-none lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Sidebar content */}
        <div className="py-4 h-[calc(100%-4rem)] overflow-y-auto">
          {filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="px-4 mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
                {section.title}
              </h3>
              
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = isPathActive(item.path);
                  const isExpanded = expandedMenus[item.path] || isActive;
                  
                  return (
                    <li key={itemIndex} className="text-sm">
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleMenu(item.path)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                            } transition-colors duration-200`}
                          >
                            <div className="flex items-center">
                              <span className="mr-3">{item.icon}</span>
                              <span>{item.name}</span>
                            </div>
                            <span>
                              {isExpanded ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </span>
                          </button>
                          
                          {isExpanded && (
                            <ul className="mt-1 pl-10 space-y-1">
                              {item.children.map((child, childIndex) => {
                                const isChildActive = location.pathname === child.path;
                                
                                return (
                                  <li key={childIndex}>
                                    <Link
                                      to={child.path}
                                      className={`block px-3 py-2 rounded-md ${
                                        isChildActive
                                          ? 'bg-white/20 text-white'
                                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                                      } transition-colors duration-200`}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`flex items-center px-3 py-2 rounded-md ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          } transition-colors duration-200`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;