import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { Save, X } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  department: string;
}

interface FormData {
  code: string;
  name: string;
  description: string;
  credits: string;
  department: string;
  semester: string;
  teacher: number | null;
  maxStudents: string;
  status: string;
}

interface FormErrors {
  code?: string;
  name?: string;
  credits?: string;
  department?: string;
  semester?: string;
  maxStudents?: string;
}

// Mock teachers for select
const mockTeachers: Teacher[] = [
  { id: 1, name: 'Dr. John Smith', department: 'Mathematics' },
  { id: 2, name: 'Prof. Sarah Johnson', department: 'Computer Science' },
  { id: 3, name: 'Dr. Michael Brown', department: 'Physics' },
  { id: 4, name: 'Prof. Emily Davis', department: 'Chemistry' },
];

// Mock departments
const departments = [
  'Mathematics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Languages',
  'Business',
];

const CourseForm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    code: '',
    name: '',
    description: '',
    credits: '',
    department: '',
    semester: '',
    teacher: null,
    maxStudents: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.code.trim()) {
      newErrors.code = 'Course code is required';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }
    
    if (!formData.credits) {
      newErrors.credits = 'Credits are required';
    } else if (isNaN(Number(formData.credits)) || Number(formData.credits) <= 0) {
      newErrors.credits = 'Credits must be a positive number';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }
    
    if (formData.maxStudents && isNaN(Number(formData.maxStudents))) {
      newErrors.maxStudents = 'Maximum students must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would call an API to save the course
      console.log('Form submitted:', formData);
      alert('Course added successfully!');
      navigate('/courses');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('courses.add')}
        subtitle={t('courses.title')}
        backButton
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('courses.basicInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.code')}*
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.code ? 'border-red-500' : ''}`}
                    placeholder="e.g., CS101"
                  />
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-500">{errors.code}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.name')}*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="e.g., Introduction to Programming"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.description')}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="form-textarea w-full"
                    placeholder="Course description..."
                  />
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('courses.details')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.credits')}*
                  </label>
                  <input
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    min="0"
                    className={`form-input w-full ${errors.credits ? 'border-red-500' : ''}`}
                  />
                  {errors.credits && (
                    <p className="mt-1 text-sm text-red-500">{errors.credits}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.department')}*
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`form-select w-full ${errors.department ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.semester')}*
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className={`form-select w-full ${errors.semester ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Semester</option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                  {errors.semester && (
                    <p className="mt-1 text-sm text-red-500">{errors.semester}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.teacher')}
                  </label>
                  <select
                    name="teacher"
                    value={formData.teacher || ''}
                    onChange={handleInputChange}
                    className="form-select w-full"
                  >
                    <option value="">Select Teacher</option>
                    {mockTeachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.maxStudents')}
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    min="0"
                    className={`form-input w-full ${errors.maxStudents ? 'border-red-500' : ''}`}
                  />
                  {errors.maxStudents && (
                    <p className="mt-1 text-sm text-red-500">{errors.maxStudents}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('courses.status')}
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="btn btn-outline"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              <Save size={16} className="mr-1" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;