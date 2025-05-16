import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import DataTable from '../../components/ui/DataTable';
import { 
  Plus, 
  Calendar, 
  Clock, 
  FileText, 
  Users, 
  Edit, 
  Trash2, 
  Filter, 
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Mock data for exams
const mockExams = [
  {
    id: 1,
    name: 'Midterm Exam - Calculus I',
    courseCode: 'MATH101',
    courseName: 'Calculus I',
    department: 'Mathematics',
    date: '2023-11-15',
    time: '09:00 - 11:00',
    duration: '2 hours',
    venue: 'Hall A',
    examType: 'Midterm',
    students: 45,
    status: 'Completed',
    resultsPublished: true,
  },
  {
    id: 2,
    name: 'Final Exam - Calculus I',
    courseCode: 'MATH101',
    courseName: 'Calculus I',
    department: 'Mathematics',
    date: '2023-12-20',
    time: '09:00 - 12:00',
    duration: '3 hours',
    venue: 'Main Hall',
    examType: 'Final',
    students: 45,
    status: 'Scheduled',
    resultsPublished: false,
  },
  {
    id: 3,
    name: 'Midterm Exam - Programming',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    department: 'Computer Science',
    date: '2023-11-10',
    time: '14:00 - 16:00',
    duration: '2 hours',
    venue: 'Computer Lab 1',
    examType: 'Midterm',
    students: 60,
    status: 'Completed',
    resultsPublished: true,
  },
  {
    id: 4,
    name: 'Final Exam - Programming',
    courseCode: 'CS101',
    courseName: 'Introduction to Programming',
    department: 'Computer Science',
    date: '2023-12-18',
    time: '14:00 - 17:00',
    duration: '3 hours',
    venue: 'Computer Lab 1, 2',
    examType: 'Final',
    students: 60,
    status: 'Scheduled',
    resultsPublished: false,
  },
  {
    id: 5,
    name: 'Quiz 2 - Physics',
    courseCode: 'PHYS101',
    courseName: 'Physics I',
    department: 'Physics',
    date: '2023-11-05',
    time: '10:00 - 10:45',
    duration: '45 minutes',
    venue: 'Room 101',
    examType: 'Quiz',
    students: 50,
    status: 'Completed',
    resultsPublished: true,
  },
  {
    id: 6,
    name: 'Midterm Exam - Physics',
    courseCode: 'PHYS101',
    courseName: 'Physics I',
    department: 'Physics',
    date: '2023-11-20',
    time: '10:00 - 12:00',
    duration: '2 hours',
    venue: 'Physics Lab',
    examType: 'Midterm',
    students: 50,
    status: 'In Progress',
    resultsPublished: false,
  },
  {
    id: 7,
    name: 'Final Exam - Physics',
    courseCode: 'PHYS101',
    courseName: 'Physics I',
    department: 'Physics',
    date: '2023-12-22',
    time: '09:00 - 12:00',
    duration: '3 hours',
    venue: 'Main Hall',
    examType: 'Final',
    students: 50,
    status: 'Scheduled',
    resultsPublished: false,
  },
  {
    id: 8,
    name: 'Midterm Exam - Data Structures',
    courseCode: 'CS201',
    courseName: 'Data Structures',
    department: 'Computer Science',
    date: '2023-11-17',
    time: '14:00 - 16:00',
    duration: '2 hours',
    venue: 'Computer Lab 2',
    examType: 'Midterm',
    students: 45,
    status: 'Scheduled',
    resultsPublished: false,
  },
];

const ExamList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [examTypeFilter, setExamTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  // Get unique values for filters
  const departments = ['all', ...new Set(mockExams.map(exam => exam.department))];
  const examTypes = ['all', ...new Set(mockExams.map(exam => exam.examType))];
  const statuses = ['all', ...new Set(mockExams.map(exam => exam.status))];
  
  // Apply filters
  const filteredExams = mockExams.filter(exam => {
    const matchesExamType = examTypeFilter === 'all' || exam.examType === examTypeFilter;
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || exam.department === departmentFilter;
    
    return matchesExamType && matchesStatus && matchesDepartment;
  });
  
  // Sort exams by date
  const sortedExams = [...filteredExams].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // Group exams by date for calendar view
  const examsByDate = sortedExams.reduce((acc, exam) => {
    if (!acc[exam.date]) {
      acc[exam.date] = [];
    }
    acc[exam.date].push(exam);
    return acc;
  }, {});
  
  const handleDeleteExam = (examId, e) => {
    e.stopPropagation();
    if (confirm(t('exams.confirmDelete'))) {
      // In a real app, you would call an API to delete the exam
      alert(`${t('exams.deleteSuccess')}`);
    }
  };
  
  // Define columns for the data table
  const columns = [
    {
      header: t('exams.name'),
      accessor: (exam) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{exam.name}</div>
          <div className="text-xs text-gray-500">{exam.courseCode} - {exam.courseName}</div>
        </div>
      ),
      sortable: true,
    },
    {
      header: t('exams.department'),
      accessor: 'department',
      sortable: true,
    },
    {
      header: t('exams.schedule'),
      accessor: (exam) => (
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1 text-gray-400" />
            {exam.date}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock size={14} className="mr-1 text-gray-400" />
            {exam.time} ({exam.duration})
          </div>
        </div>
      ),
    },
    {
      header: t('exams.venue'),
      accessor: 'venue',
    },
    {
      header: t('exams.type'),
      accessor: (exam) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          exam.examType === 'Final' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          exam.examType === 'Midterm' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {exam.examType}
        </span>
      ),
      sortable: true,
    },
    {
      header: t('exams.students'),
      accessor: (exam) => (
        <div className="flex items-center">
          <Users size={14} className="mr-1 text-gray-400" />
          {exam.students}
        </div>
      ),
      sortable: true,
    },
    {
      header: t('exams.status'),
      accessor: (exam) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          exam.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          exam.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
          {exam.status === 'Scheduled' && <Calendar size={12} className="mr-1" />}
          {exam.status === 'In Progress' && <AlertCircle size={12} className="mr-1" />}
          {exam.status === 'Completed' && <CheckCircle size={12} className="mr-1" />}
          {exam.status}
        </span>
      ),
      sortable: true,
    },
    {
      header: t('exams.results'),
      accessor: (exam) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          exam.resultsPublished ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {exam.resultsPublished ? <CheckCircle size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
          {exam.resultsPublished ? t('exams.resultsPublished') : t('exams.resultsNotPublished')}
        </span>
      ),
    },
    {
      header: t('common.actions'),
      accessor: (exam) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/exams/edit/${exam.id}`);
            }}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title={t('exams.edit')}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDeleteExam(exam.id, e)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title={t('exams.delete')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <FileText size={24} className="mr-2 text-primary" />
          {t('exams.list')}
        </h1>
        <div className="flex mt-3 sm:mt-0">
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md mr-3">
            <button
              className={`px-3 py-1 rounded-l-md ${
                view === 'list' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setView('list')}
              title={t('exams.listView')}
            >
              <FileText size={16} />
            </button>
            <button
              className={`px-3 py-1 rounded-r-md ${
                view === 'calendar' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setView('calendar')}
              title={t('exams.calendarView')}
            >
              <Calendar size={16} />
            </button>
          </div>
          <button
            onClick={() => navigate('/exams/create')}
            className="btn btn-primary"
          >
            <Plus size={16} className="mr-1" />
            {t('exams.create')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <Filter size={16} className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('exams.filter')}</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('exams.examType')}
              </label>
              <select
                value={examTypeFilter}
                onChange={(e) => setExamTypeFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">{t('exams.allTypes')}</option>
                {examTypes.filter(type => type !== 'all').map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('exams.status')}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">{t('exams.allStatuses')}</option>
                {statuses.filter(status => status !== 'all').map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('exams.department')}
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">{t('exams.allDepartments')}</option>
                {departments.filter(dept => dept !== 'all').map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <DataTable
            data={sortedExams}
            columns={columns}
            keyExtractor={(item) => item.id.toString()}
            onRowClick={(exam) => navigate(`/exams/edit/${exam.id}`)}
            pagination={true}
            searchable={false}
            emptyMessage={t('exams.noExamsFound')}
          />
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {Object.keys(examsByDate).length > 0 ? (
            <div className="space-y-6">
              {Object.keys(examsByDate).sort().map((date) => (
                <div key={date} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <Calendar size={18} className="mr-2 text-primary" />
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  
                  <div className="space-y-3">
                    {examsByDate[date].map((exam) => (
                      <div 
                        key={exam.id} 
                        className="flex flex-col sm:flex-row justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => navigate(`/exams/edit/${exam.id}`)}
                      >
                        <div className="mb-2 sm:mb-0">
                          <div className="font-medium text-gray-900 dark:text-white flex items-center">
                            <FileText size={16} className="mr-2 text-primary" />
                            {exam.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {exam.courseCode} - {exam.department}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:items-end">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock size={14} className="mr-1" />
                            {exam.time} ({exam.duration})
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {exam.venue}
                          </div>
                          <div className="flex items-center mt-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              exam.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              exam.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {exam.status}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ml-2 ${
                              exam.examType === 'Final' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              exam.examType === 'Midterm' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {exam.examType}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
              <p>{t('exams.noExamsFound')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamList;