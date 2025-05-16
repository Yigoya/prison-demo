import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  class: string;
}

const mockStudents = [
  { id: 'ST001', name: 'John Doe', class: 'Class 10A' },
  { id: 'ST002', name: 'Jane Smith', class: 'Class 10A' },
  { id: 'ST003', name: 'Mike Johnson', class: 'Class 10A' },
  { id: 'ST004', name: 'Sarah Williams', class: 'Class 10B' },
  { id: 'ST005', name: 'David Brown', class: 'Class 10B' },
  { id: 'ST006', name: 'Emily Davis', class: 'Class 10B' },
  { id: 'ST007', name: 'James Wilson', class: 'Class 10A' },
  { id: 'ST008', name: 'Lisa Anderson', class: 'Class 10B' },
  { id: 'ST009', name: 'Robert Taylor', class: 'Class 10A' },
  { id: 'ST010', name: 'Emma Martinez', class: 'Class 10B' },
];

const generateAttendanceRecords = (date: Date) => {
  return mockStudents.map(student => ({
    id: `${student.id}-${format(date, 'yyyy-MM-dd')}`,
    studentId: student.id,
    studentName: student.name,
    date: date,
    status: ['present', 'absent', 'late'][Math.floor(Math.random() * 3)] as 'present' | 'absent' | 'late',
    class: student.class
  }));
};

const AttendanceManagement = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('all');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const records = generateAttendanceRecords(selectedDate);
        setAttendanceRecords(records);
      } catch (err) {
        setError(t('attendance.errorLoading'));
        console.error('Error fetching attendance:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, [selectedDate]);

  const handleStatusChange = async (recordId: string, newStatus: 'present' | 'absent' | 'late') => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setAttendanceRecords(records =>
        records.map(record =>
          record.id === recordId ? { ...record, status: newStatus } : record
        )
      );
    } catch (err) {
      console.error('Error updating attendance:', err);
      // You might want to show an error message to the user here
    }
  };

  const handleExport = async () => {
    try {
      const filteredRecords = attendanceRecords.filter(record => 
        selectedClass === 'all' || record.class === selectedClass
      );
      
      const csvContent = [
        ['Student ID', 'Name', 'Class', 'Date', 'Status'].join(','),
        ...filteredRecords.map(record => [
          record.studentId,
          record.studentName,
          record.class,
          format(record.date, 'yyyy-MM-dd'),
          record.status
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `attendance-${format(selectedDate, 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error exporting attendance:', err);
    }
  };

  const filteredRecords = attendanceRecords.filter(record => 
    selectedClass === 'all' || record.class === selectedClass
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('attendance.manage')}
        subtitle={t('attendance.title')}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2"
            />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2"
            >
              <option value="all">{t('attendance.allClasses')}</option>
              <option value="Class 10A">Class 10A</option>
              <option value="Class 10B">Class 10B</option>
            </select>
          </div>
          <button
            onClick={handleExport}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            {t('attendance.export')}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('attendance.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('attendance.studentId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('attendance.studentName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('attendance.class')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('attendance.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {record.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {record.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                          record.status === 'absent' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {t(`attendance.${record.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <select
                        value={record.status}
                        onChange={(e) => handleStatusChange(record.id, e.target.value as 'present' | 'absent' | 'late')}
                        className="rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1"
                      >
                        <option value="present">{t('attendance.present')}</option>
                        <option value="absent">{t('attendance.absent')}</option>
                        <option value="late">{t('attendance.late')}</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;