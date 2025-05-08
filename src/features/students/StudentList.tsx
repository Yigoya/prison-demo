import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Download, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { mockStudents, Student } from '../../data/mockStudents';

const StudentList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filterInmate, setFilterInmate] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRowClick = (student: Student) => {
    navigate(`/students/${student.id}`);
  };
  
  const filteredStudents = filterInmate === null 
    ? mockStudents 
    : mockStudents.filter(student => student.isInmate === filterInmate);
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('students.list')}
        subtitle={t('students.title')}
      >
        <button
          onClick={() => navigate('/students/register')}
          className="btn btn-primary flex items-center"
        >
          <PlusCircle size={16} className="mr-2" />
          {t('students.register')}
        </button>
        <button className="btn btn-outline flex items-center">
          <Download size={16} className="mr-2" />
          {t('common.export')}
        </button>
      </PageHeader>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => setFilterInmate(null)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filterInmate === null 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {t('common.all')}
        </button>
        <button
          onClick={() => setFilterInmate(false)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filterInmate === false 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {t('students.regular')}
        </button>
        <button
          onClick={() => setFilterInmate(true)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            filterInmate === true 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {t('students.inmates')}
        </button>
        <div className="ml-auto">
          <button className="btn btn-outline flex items-center">
            <Filter size={16} className="mr-2" />
            {t('common.filter')}
          </button>
        </div>
      </div>
      
      <DataTable
        data={filteredStudents}
        loading={isLoading}
        keyExtractor={(student) => student.id}
        onRowClick={handleRowClick}
        columns={[
          {
            header: t('students.id'),
            accessor: 'id',
            sortable: true,
          },
          {
            header: t('students.name'),
            accessor: (student) => (
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                  {student.photo ? (
                    <img src={student.photo} alt={student.studentName} className="h-8 w-8 rounded-full" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {student.studentName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {student.studentName} {student.fatherName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {student.email}
                  </div>
                </div>
              </div>
            ),
            sortable: false,
          },
          {
            header: t('students.department'),
            accessor: 'department',
            sortable: true,
          },
          {
            header: t('students.typeOfEducation'),
            accessor: 'typeOfEducation',
            sortable: true,
          },
          {
            header: t('students.batchNumber'),
            accessor: 'batchNumber',
            sortable: true,
          },
          {
            header: t('common.type'),
            accessor: (student) => (
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                student.isInmate 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {student.isInmate ? t('students.inmate') : t('students.regular')}
              </span>
            ),
            sortable: false,
          },
          {
            header: t('students.registrationDate'),
            accessor: 'registrationDate',
            sortable: true,
          },
          {
            header: t('common.actions'),
            accessor: () => (
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  {t('common.view')}
                </button>
                <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                  {t('common.edit')}
                </button>
              </div>
            ),
            sortable: false,
          },
        ]}
        emptyMessage={t('students.noStudentsFound')}
      />
    </div>
  );
};

export default StudentList;