import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
}

interface Course {
  id: number;
  code: string;
  name: string;
}

interface StudentResult {
  studentId: number;
  marks: string;
  grade: string;
  remarks: string;
}

interface FormData {
  courseId: number | null;
  examDate: string;
  examType: string;
  totalMarks: string;
  passingMarks: string;
  results: StudentResult[];
}

interface FormErrors {
  courseId?: string;
  examDate?: string;
  examType?: string;
  totalMarks?: string;
  passingMarks?: string;
  results?: { [key: number]: { marks?: string; grade?: string } };
}

// Mock courses for select
const mockCourses: Course[] = [
  { id: 1, code: 'MATH101', name: 'Calculus I' },
  { id: 2, code: 'MATH201', name: 'Linear Algebra' },
  { id: 3, code: 'CS101', name: 'Introduction to Programming' },
  { id: 4, code: 'PHYS101', name: 'Physics I' },
];

// Mock students for the results table
const mockStudents: Student[] = [
  { id: 1, name: 'John Doe', rollNumber: '2023001' },
  { id: 2, name: 'Jane Smith', rollNumber: '2023002' },
  { id: 3, name: 'Mike Johnson', rollNumber: '2023003' },
  { id: 4, name: 'Sarah Williams', rollNumber: '2023004' },
];

const examTypes = [
  'midterm',
  'final',
  'quiz',
  'assignment',
  'project',
  'lab',
];

const ExamResults = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    courseId: null,
    examDate: new Date().toISOString().split('T')[0],
    examType: '',
    totalMarks: '100',
    passingMarks: '50',
    results: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleResultChange = (studentId: number, field: keyof StudentResult, value: string) => {
    const updatedResults = formData.results.map(result => {
      if (result.studentId === studentId) {
        return { ...result, [field]: value };
      }
      return result;
    });

    if (!formData.results.some(r => r.studentId === studentId)) {
      updatedResults.push({
        studentId,
        marks: field === 'marks' ? value : '',
        grade: field === 'grade' ? value : '',
        remarks: field === 'remarks' ? value : '',
      });
    }

    setFormData({
      ...formData,
      results: updatedResults,
    });

    // Clear error for this student if exists
    if (errors.results?.[studentId]?.[field as keyof typeof errors.results[number]]) {
      setErrors({
        ...errors,
        results: {
          ...errors.results,
          [studentId]: {
            ...errors.results[studentId],
            [field]: '',
          },
        },
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.courseId) {
      newErrors.courseId = t('exams.courseRequired');
    }
    
    if (!formData.examDate) {
      newErrors.examDate = t('exams.dateRequired');
    }
    
    if (!formData.examType) {
      newErrors.examType = t('exams.typeRequired');
    }
    
    if (!formData.totalMarks) {
      newErrors.totalMarks = t('exams.totalMarksRequired');
    } else if (isNaN(Number(formData.totalMarks)) || Number(formData.totalMarks) <= 0) {
      newErrors.totalMarks = t('exams.invalidMarks');
    }
    
    if (!formData.passingMarks) {
      newErrors.passingMarks = t('exams.passingMarksRequired');
    } else if (isNaN(Number(formData.passingMarks)) || Number(formData.passingMarks) <= 0) {
      newErrors.passingMarks = t('exams.invalidMarks');
    } else if (Number(formData.passingMarks) > Number(formData.totalMarks)) {
      newErrors.passingMarks = t('exams.passingExceedsTotal');
    }

    // Validate student results
    const resultErrors: { [key: number]: { marks?: string; grade?: string } } = {};
    mockStudents.forEach(student => {
      const result = formData.results.find(r => r.studentId === student.id);
      if (result) {
        if (result.marks && (isNaN(Number(result.marks)) || Number(result.marks) < 0)) {
          resultErrors[student.id] = { ...resultErrors[student.id], marks: t('exams.invalidMarks') };
        }
        if (result.marks && Number(result.marks) > Number(formData.totalMarks)) {
          resultErrors[student.id] = { ...resultErrors[student.id], marks: t('exams.marksExceedTotal') };
        }
      }
    });

    if (Object.keys(resultErrors).length > 0) {
      newErrors.results = resultErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would call an API to save the exam results
      console.log('Form submitted:', formData);
      alert(t('exams.resultsSuccess'));
      navigate('/exams');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('exams.addResults')}
        subtitle={t('exams.title')}
        backButton
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Exam Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('exams.examInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.course')}*
                  </label>
                  <select
                    name="courseId"
                    value={formData.courseId || ''}
                    onChange={handleInputChange}
                    className={`form-select w-full ${errors.courseId ? 'border-red-500' : ''}`}
                  >
                    <option value="">{t('exams.selectCourse')}</option>
                    {mockCourses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                  {errors.courseId && (
                    <p className="mt-1 text-sm text-red-500">{errors.courseId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.date')}*
                  </label>
                  <input
                    type="date"
                    name="examDate"
                    value={formData.examDate}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.examDate ? 'border-red-500' : ''}`}
                  />
                  {errors.examDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.examDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.type')}*
                  </label>
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleInputChange}
                    className={`form-select w-full ${errors.examType ? 'border-red-500' : ''}`}
                  >
                    <option value="">{t('exams.selectExamType')}</option>
                    {examTypes.map((type, index) => (
                      <option key={index} value={type}>{t(`exams.${type}`)}</option>
                    ))}
                  </select>
                  {errors.examType && (
                    <p className="mt-1 text-sm text-red-500">{errors.examType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.totalMarks')}*
                  </label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleInputChange}
                    min="0"
                    className={`form-input w-full ${errors.totalMarks ? 'border-red-500' : ''}`}
                  />
                  {errors.totalMarks && (
                    <p className="mt-1 text-sm text-red-500">{errors.totalMarks}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.passingMarks')}*
                  </label>
                  <input
                    type="number"
                    name="passingMarks"
                    value={formData.passingMarks}
                    onChange={handleInputChange}
                    min="0"
                    className={`form-input w-full ${errors.passingMarks ? 'border-red-500' : ''}`}
                  />
                  {errors.passingMarks && (
                    <p className="mt-1 text-sm text-red-500">{errors.passingMarks}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Student Results */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('exams.studentResults')}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('exams.rollNumber')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('exams.studentName')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('exams.marks')}*
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('exams.grade')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('exams.remarks')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {mockStudents.map(student => {
                      const result = formData.results.find(r => r.studentId === student.id);
                      const studentErrors = errors.results?.[student.id];
                      
                      return (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {student.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              value={result?.marks || ''}
                              onChange={(e) => handleResultChange(student.id, 'marks', e.target.value)}
                              min="0"
                              max={formData.totalMarks}
                              className={`form-input w-24 ${studentErrors?.marks ? 'border-red-500' : ''}`}
                            />
                            {studentErrors?.marks && (
                              <p className="mt-1 text-sm text-red-500">{studentErrors.marks}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={result?.grade || ''}
                              onChange={(e) => handleResultChange(student.id, 'grade', e.target.value)}
                              className="form-select w-24"
                            >
                              <option value="">{t('exams.grade')}</option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                              <option value="C+">C+</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="F">F</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={result?.remarks || ''}
                              onChange={(e) => handleResultChange(student.id, 'remarks', e.target.value)}
                              className="form-input w-full"
                              placeholder={t('exams.remarks')}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/exams')}
              className="btn btn-outline"
            >
              <X size={16} className="mr-1" />
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} className="mr-1" />
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamResults;