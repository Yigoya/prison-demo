import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  class: string;
  grade: number;
  maxGrade: number;
  date: Date;
  comments?: string;
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

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology'
];

const generateGrades = () => {
  const grades: Grade[] = [];
  mockStudents.forEach(student => {
    subjects.forEach(subject => {
      grades.push({
        id: `${student.id}-${subject}`,
        studentId: student.id,
        studentName: student.name,
        subject,
        class: student.class,
        grade: Math.floor(Math.random() * 41) + 60, // Random grade between 60 and 100
        maxGrade: 100,
        date: new Date(),
        comments: Math.random() > 0.5 ? 'Good performance' : undefined
      });
    });
  });
  return grades;
};

const GradeManagement = () => {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const fetchedGrades = generateGrades();
        setGrades(fetchedGrades);
      } catch (err) {
        setError(t('grades.errorLoading'));
        console.error('Error fetching grades:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrades();
  }, [t]);

  const handleGradeChange = async (gradeId: string, newGrade: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setGrades(grades =>
        grades.map(grade =>
          grade.id === gradeId ? { ...grade, grade: newGrade } : grade
        )
      );
    } catch (err) {
      console.error('Error updating grade:', err);
    }
  };

  const handleCommentsChange = async (gradeId: string, comments: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setGrades(grades =>
        grades.map(grade =>
          grade.id === gradeId ? { ...grade, comments } : grade
        )
      );
    } catch (err) {
      console.error('Error updating comments:', err);
    }
  };

  const calculateAverage = (grades: Grade[]) => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + (grade.grade / grade.maxGrade) * 100, 0);
    return (sum / grades.length).toFixed(2);
  };

  const filteredGrades = grades.filter(grade => {
    if (selectedClass !== 'all' && grade.class !== selectedClass) return false;
    if (selectedSubject !== 'all' && grade.subject !== selectedSubject) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('grades.manage')}
        subtitle={t('grades.title')}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2"
            >
              <option value="all">{t('grades.allClasses')}</option>
              <option value="Class 10A">Class 10A</option>
              <option value="Class 10B">Class 10B</option>
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2"
            >
              <option value="all">{t('grades.allSubjects')}</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('grades.classAverage')}: {calculateAverage(filteredGrades)}%
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{t('grades.loading')}</p>
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
                    {t('grades.studentId')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('grades.studentName')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('grades.subject')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('grades.class')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('grades.grade')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('grades.comments')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((grade) => (
                    <tr key={grade.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {grade.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {grade.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {grade.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {grade.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        <input
                          type="number"
                          min="0"
                          max={grade.maxGrade}
                          value={grade.grade}
                          onChange={(e) => handleGradeChange(grade.id, parseInt(e.target.value))}
                          className="w-20 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1"
                        />
                        <span className="ml-1 text-gray-500">/ {grade.maxGrade}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                        <input
                          type="text"
                          value={grade.comments || ''}
                          onChange={(e) => handleCommentsChange(grade.id, e.target.value)}
                          placeholder={t('grades.enterComments')}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      {t('grades.noGradesFound')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeManagement;