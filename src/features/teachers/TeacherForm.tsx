import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { Save, X } from 'lucide-react';

interface Course {
  id: number;
  code: string;
  name: string;
}

interface FormData {
  name: string;
  gender: string;
  qualification: string;
  specialization: string;
  experience: string;
  department: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
  courses: Course[];
}

interface FormErrors {
  name?: string;
  gender?: string;
  qualification?: string;
  department?: string;
  email?: string;
  joinDate?: string;
}

// Mock courses for multi-select
const mockCourses: Course[] = [
  { id: 1, code: 'MATH101', name: 'Calculus I' },
  { id: 2, code: 'MATH201', name: 'Linear Algebra' },
  { id: 3, code: 'CS101', name: 'Introduction to Programming' },
  { id: 4, code: 'PHYS101', name: 'Physics I' },
  { id: 5, code: 'CHEM101', name: 'Chemistry I' },
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

const TeacherForm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    qualification: '',
    specialization: '',
    experience: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
    courses: [],
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

  const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => ({
      id: parseInt(option.value),
      code: option.getAttribute('data-code') || '',
      name: option.getAttribute('data-name') || '',
    }));
    setFormData({
      ...formData,
      courses: selectedOptions,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would call an API to save the teacher
      console.log('Form submitted:', formData);
      alert(t('teachers.addTeacherSuccess'));
      navigate('/teachers');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teachers.add')}
        subtitle={t('teachers.title')}
        backButton
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('teachers.personalInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.name')}*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.gender')}*
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`form-select w-full ${errors.gender ? 'border-red-500' : ''}`}
                  >
                    <option value="">{t('teachers.selectGender')}</option>
                    <option value="Male">{t('common.male')}</option>
                    <option value="Female">{t('common.female')}</option>
                    <option value="Other">{t('common.other')}</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.qualification')}*
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.qualification ? 'border-red-500' : ''}`}
                    placeholder="e.g., PhD in Mathematics"
                  />
                  {errors.qualification && (
                    <p className="mt-1 text-sm text-red-500">{errors.qualification}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.specialization')}
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="e.g., Applied Mathematics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.department')}*
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`form-select w-full ${errors.department ? 'border-red-500' : ''}`}
                  >
                    <option value="">{t('teachers.selectDepartment')}</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('teachers.contactInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.email')}*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input w-full"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('teachers.professionalInfo')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.employmentStatus')}*
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select w-full"
                  >
                    <option value="Active">{t('teachers.active')}</option>
                    <option value="On Leave">{t('teachers.onLeave')}</option>
                    <option value="Inactive">{t('teachers.inactive')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.employmentDate')}*
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className={`form-input w-full ${errors.joinDate ? 'border-red-500' : ''}`}
                  />
                  {errors.joinDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.joinDate}</p>
                  )}
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('teachers.assignedCourses')}
                  </label>
                  <select
                    multiple
                    name="courses"
                    value={formData.courses.map(c => c.id.toString())}
                    onChange={handleCourseChange}
                    className="form-multiselect w-full"
                    size={4}
                  >
                    {mockCourses.map(course => (
                      <option 
                        key={course.id} 
                        value={course.id.toString()}
                        data-code={course.code}
                        data-name={course.name}
                      >
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Hold Ctrl/Cmd to select multiple courses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/teachers')}
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

export default TeacherForm;