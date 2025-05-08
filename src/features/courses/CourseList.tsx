import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import { ReactNode } from 'react';

// Define Course type
interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  level: string;
  instructors: string[];
  status: string;
  students: number;
  startDate: string;
  endDate: string;
}

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 3,
    level: "Beginner",
    instructors: ["John Doe", "Jane Smith"],
    status: "active",
    students: 45,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
  {
    id: "2",
    code: "MATH201",
    name: "Calculus I",
    department: "Mathematics",
    credits: 4,
    level: "Intermediate",
    instructors: ["Robert Johnson"],
    status: "active",
    students: 38,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
  {
    id: "3",
    code: "ENG105",
    name: "Academic Writing",
    department: "English",
    credits: 3,
    level: "Beginner",
    instructors: ["Sarah Williams"],
    status: "inactive",
    students: 0,
    startDate: "2024-01-15",
    endDate: "2024-05-01",
  },
  {
    id: "4",
    code: "HIST100",
    name: "World History",
    department: "History",
    credits: 3,
    level: "Beginner",
    instructors: ["Michael Brown"],
    status: "active",
    students: 52,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
  {
    id: "5",
    code: "BIO210",
    name: "Human Anatomy",
    department: "Biology",
    credits: 4,
    level: "Intermediate",
    instructors: ["Elizabeth Taylor"],
    status: "active",
    students: 30,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
  {
    id: "6",
    code: "PSYCH101",
    name: "Introduction to Psychology",
    department: "Psychology",
    credits: 3,
    level: "Beginner",
    instructors: ["David Miller"],
    status: "active",
    students: 60,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
  {
    id: "7",
    code: "ART150",
    name: "Drawing Fundamentals",
    department: "Art",
    credits: 2,
    level: "Beginner",
    instructors: ["Patricia Clark"],
    status: "active",
    students: 25,
    startDate: "2023-09-01",
    endDate: "2023-12-15",
  },
];

const CourseList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Define table columns
  const columns = [
    {
      header: t('courses.code'),
      accessor: 'code' as keyof Course,
      sortable: true,
    },
    {
      header: t('courses.name'),
      accessor: 'name' as keyof Course,
      sortable: true,
    },
    {
      header: t('courses.department'),
      accessor: 'department' as keyof Course,
      sortable: true,
    },
    {
      header: t('courses.credits'),
      accessor: 'credits' as keyof Course,
      sortable: true,
    },
    {
      header: t('courses.level'),
      accessor: 'level' as keyof Course,
      sortable: true,
    },
    {
      header: t('courses.students'),
      accessor: 'students' as keyof Course,
      sortable: true,
    },
    {
      header: t('common.status'),
      accessor: (course: Course): ReactNode => (
        <span 
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            course.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {course.status === 'active' ? t('common.active') : t('common.inactive')}
        </span>
      ),
    },
    {
      header: t('common.actions'),
      accessor: (course: Course): ReactNode => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              navigate(`/courses/${course.id}`);
            }}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              navigate(`/courses/edit/${course.id}`);
            }}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              // Handle delete action
              if (window.confirm(t('courses.confirmDelete'))) {
                console.log('Delete course:', course.id);
              }
            }}
            className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('courses.list')}
        subtitle={t('courses.title')}
      >
        <button
          onClick={() => navigate('/courses/add')}
          className="btn btn-primary flex items-center"
        >
          <PlusCircle size={16} className="mr-2" />
          {t('courses.add')}
        </button>
      </PageHeader>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <DataTable
          data={mockCourses}
          columns={columns}
          keyExtractor={(item: Course) => item.id}
          onRowClick={(course: Course) => navigate(`/courses/${course.id}`)}
          searchPlaceholder={t('courses.searchPlaceholder')}
          emptyMessage={t('courses.noCoursesFound')}
        />
      </div>
    </div>
  );
};

export default CourseList;