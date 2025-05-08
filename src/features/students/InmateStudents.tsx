import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { mockStudents } from '../../data/mockStudents';

const InmateStudents = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter only inmate students
  const inmateStudents = mockStudents.filter(student => student.isInmate);
  
  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('students.inmatesList')}
        subtitle={t('students.title')}
      />
      
      <DataTable
        data={inmateStudents}
        loading={isLoading}
        keyExtractor={(student) => student.id}
        onRowClick={(student) => navigate(`/students/${student.id}`)}
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
            header: t('students.sentenceDuration'),
            accessor: (student) => student.inmateInfo?.sentenceDuration || '-',
            sortable: true,
          },
          {
            header: t('students.typeOfCrime'),
            accessor: (student) => student.inmateInfo?.typeOfCrime || '-',
            sortable: true,
          },
          {
            header: t('students.currentStatus'),
            accessor: (student) => student.inmateInfo?.currentStatus || '-',
            sortable: true,
          },
          {
            header: t('students.residingZone'),
            accessor: (student) => student.inmateInfo?.residingZone || '-',
            sortable: true,
          },
          {
            header: t('students.imprisonmentStartDate'),
            accessor: (student) => student.inmateInfo?.imprisonmentStartDate || '-',
            sortable: true,
          },
        ]}
        emptyMessage={t('students.noStudentsFound')}
      />
    </div>
  );
};

export default InmateStudents;