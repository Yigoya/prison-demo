import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Save, X, Calendar, Clock, Building, FileText, Users } from 'lucide-react';

// Mock courses data for dropdown
const mockCourses = [
  { id: 1, code: 'MATH101', name: 'Calculus I', department: 'Mathematics' },
  { id: 2, code: 'MATH201', name: 'Linear Algebra', department: 'Mathematics' },
  { id: 3, code: 'MATH301', name: 'Differential Equations', department: 'Mathematics' },
  { id: 4, code: 'CS101', name: 'Introduction to Programming', department: 'Computer Science' },
  { id: 5, code: 'CS201', name: 'Data Structures', department: 'Computer Science' },
  { id: 6, code: 'CS301', name: 'Algorithms', department: 'Computer Science' },
  { id: 7, code: 'PHYS101', name: 'Physics I', department: 'Physics' },
  { id: 8, code: 'PHYS201', name: 'Quantum Mechanics', department: 'Physics' },
  { id: 9, code: 'CHEM101', name: 'General Chemistry', department: 'Chemistry' },
  { id: 10, code: 'BIO101', name: 'Biology I', department: 'Biology' },
];

// Mock venues data for dropdown
const mockVenues = [
  { id: 1, name: 'Main Hall', capacity: 200 },
  { id: 2, name: 'Room 101', capacity: 50 },
  { id: 3, name: 'Room 102', capacity: 50 },
  { id: 4, name: 'Room 103', capacity: 50 },
  { id: 5, name: 'Computer Lab 1', capacity: 30 },
  { id: 6, name: 'Computer Lab 2', capacity: 30 },
  { id: 7, name: 'Physics Lab', capacity: 40 },
  { id: 8, name: 'Chemistry Lab', capacity: 35 },
  { id: 9, name: 'Biology Lab', capacity: 35 },
  { id: 10, name: 'Hall A', capacity: 100 },
  { id: 11, name: 'Hall B', capacity: 100 },
];

// Mock exam for editing
const mockExam = {
  id: 1,
  name: 'Midterm Exam - Calculus I',
  courseId: 1,
  examType: 'Midterm',
  date: '2023-11-15',
  startTime: '09:00',
  endTime: '11:00',
  duration: '2 hours',
  venueId: 10,
  maxMarks: 100,
  passingMarks: 40,
  instructions: '1. Answer all questions\n2. Use blue or black pen only\n3. No calculators allowed\n4. All rough work should be done on the answer sheet',
  status: 'Scheduled',
  sections: [
    { name: 'Multiple Choice', marks: 30, questions: 15, description: '15 multiple choice questions, 2 marks each' },
    { name: 'Short Answer', marks: 30, questions: 6, description: '6 short answer questions, 5 marks each' },
    { name: 'Long Answer', marks: 40, questions: 2, description: '2 long answer questions, 20 marks each' },
  ],
};

const ExamCreate = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    examType: 'Midterm',
    date: '',
    startTime: '',
    endTime: '',
    venueId: '',
    maxMarks: 100,
    passingMarks: 40,
    instructions: '',
    status: 'Scheduled',
    sections: [
      { name: t('exams.section') + ' 1', marks: 0, questions: 0, description: '' },
    ],
  });
  
  const [activeTab, setActiveTab] = useState('basic');
  const [courseDepartment, setCourseDepartment] = useState('');
  
  // Calculate total marks from sections
  const totalMarks = formData.sections.reduce((sum, section) => sum + (section.marks || 0), 0);
  const totalQuestions = formData.sections.reduce((sum, section) => sum + (section.questions || 0), 0);
  
  // Load exam data if editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch the exam from an API
      setFormData({
        ...mockExam,
      });
      
      // Set course department for filtering venues
      const course = mockCourses.find(c => c.id === mockExam.courseId);
      if (course) {
        setCourseDepartment(course.department);
      }
    }
  }, [id, isEditing]);
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleCourseChange = (e) => {
    const courseId = parseInt(e.target.value);
    setFormData({
      ...formData,
      courseId,
    });
    
    // Update course name and department
    const selectedCourse = mockCourses.find(c => c.id === courseId);
    if (selectedCourse) {
      setFormData({
        ...formData,
        courseId,
        name: `${e.target.options[e.target.selectedIndex].getAttribute('data-examtype') || 'Exam'} - ${selectedCourse.name}`,
      });
      setCourseDepartment(selectedCourse.department);
    }
  };
  
  const handleExamTypeChange = (e) => {
    const examType = e.target.value;
    setFormData({
      ...formData,
      examType,
    });
    
    // Update exam name
    if (formData.courseId) {
      const selectedCourse = mockCourses.find(c => c.id === parseInt(formData.courseId));
      if (selectedCourse) {
        setFormData({
          ...formData,
          examType,
          name: `${examType} - ${selectedCourse.name}`,
        });
      }
    }
  };
  
  // Handle section changes
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: field === 'marks' || field === 'questions' ? (parseInt(value) || 0) : value,
    };
    
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };
  
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections, 
        { 
          name: `Section ${formData.sections.length + 1}`, 
          marks: 0, 
          questions: 0, 
          description: '' 
        }
      ],
    });
  };
  
  const removeSection = (index) => {
    if (formData.sections.length > 1) {
      const updatedSections = [...formData.sections];
      updatedSections.splice(index, 1);
      
      setFormData({
        ...formData,
        sections: updatedSections,
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Validate form
    if (totalMarks !== formData.maxMarks) {
      alert(t('exams.passingExceedsTotal'));
      return;
    }
    
    // Show success message
    alert(isEditing ? t('exams.updateSuccess') : t('exams.addSuccess'));
    
    // Navigate back to exam list
    navigate('/exams');
  };
  
  const tabs = [
    { id: 'basic', label: t('exams.basicInfo') },
    { id: 'sections', label: t('exams.sections') },
    { id: 'instructions', label: t('exams.instructions') },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <FileText size={24} className="mr-2 text-primary" />
          {isEditing ? t('exams.edit') : t('exams.create')}
        </h1>
        <div className="flex gap-2">
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
            form="exam-form"
            className="btn btn-primary"
          >
            <Save size={16} className="mr-1" />
            {t('common.save')}
          </button>
        </div>
      </div>

      {/* Form with Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary dark:border-primary dark:text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Form */}
        <form id="exam-form" onSubmit={handleSubmit} className="p-6">
          {/* Status Bar at the Top */}
          {isEditing && (
            <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  formData.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  formData.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {t(`exams.${formData.status.toLowerCase().replace(' ', '')}`)}
                </span>
              </div>
              
              <div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select text-sm"
                >
                  <option value="Scheduled">{t('exams.scheduled')}</option>
                  <option value="In Progress">{t('exams.inProgress')}</option>
                  <option value="Completed">{t('exams.completed')}</option>
                  <option value="Cancelled">{t('exams.cancelled')}</option>
                </select>
              </div>
            </div>
          )}

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('exams.course')}*
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleCourseChange}
                  required
                  className="form-select w-full"
                  data-examtype={formData.examType}
                >
                  <option value="">{t('exams.selectCourse')}</option>
                  {mockCourses.map((course) => (
                    <option 
                      key={course.id} 
                      value={course.id}
                      data-examtype={formData.examType}
                    >
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('exams.examType')}*
                </label>
                <select
                  name="examType"
                  value={formData.examType}
                  onChange={handleExamTypeChange}
                  required
                  className="form-select w-full"
                >
                  <option value="Quiz">{t('exams.quiz')}</option>
                  <option value="Midterm">{t('exams.midterm')}</option>
                  <option value="Final">{t('exams.final')}</option>
                  <option value="Assignment">{t('exams.assignment')}</option>
                  <option value="Practical">{t('exams.practical')}</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('exams.name')}*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t('exams.midterm') + ' - ' + t('courses.name')}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('exams.date')}*
                </label>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 absolute ml-3 pointer-events-none" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="form-input pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.startTime')}*
                  </label>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 absolute ml-3 pointer-events-none" />
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                      className="form-input pl-10 w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.endTime')}*
                  </label>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 absolute ml-3 pointer-events-none" />
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                      className="form-input pl-10 w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('exams.venue')}*
                </label>
                <div className="flex items-center">
                  <Building size={16} className="text-gray-400 absolute ml-3 pointer-events-none" />
                  <select
                    name="venueId"
                    value={formData.venueId}
                    onChange={handleInputChange}
                    required
                    className="form-select pl-10 w-full"
                  >
                    <option value="">{t('exams.selectVenue')}</option>
                    {mockVenues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name} ({t('exams.venueCapacity')}: {venue.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('exams.totalMarks')}*
                  </label>
                  <input
                    type="number"
                    name="maxMarks"
                    value={formData.maxMarks}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="form-input w-full"
                  />
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
                    required
                    min="1"
                    max={formData.maxMarks}
                    className="form-input w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Exam Sections Tab */}
          {activeTab === 'sections' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('exams.sections')}
                </h3>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('common.total')}: {totalMarks}/{formData.maxMarks} {t('exams.marks')}, {totalQuestions} {t('exams.questions')}
                </div>
              </div>
              
              {formData.sections.map((section, index) => (
                <div 
                  key={index} 
                  className="p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      {t('exams.section')} {index + 1}
                    </h4>
                    
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('exams.sectionName')}*
                      </label>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => handleSectionChange(index, 'name', e.target.value)}
                        required
                        className="form-input w-full"
                        placeholder={t('exams.quiz')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('exams.questionCount')}*
                      </label>
                      <input
                        type="number"
                        value={section.questions}
                        onChange={(e) => handleSectionChange(index, 'questions', e.target.value)}
                        required
                        min="1"
                        className="form-input w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('exams.sectionMarks')}*
                      </label>
                      <input
                        type="number"
                        value={section.marks}
                        onChange={(e) => handleSectionChange(index, 'marks', e.target.value)}
                        required
                        min="1"
                        className="form-input w-full"
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('exams.sectionDescription')}
                      </label>
                      <input
                        type="text"
                        value={section.description}
                        onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                        className="form-input w-full"
                        placeholder={t('exams.quiz') + ', 2 ' + t('exams.marks') + ' ' + t('common.each')}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addSection}
                  className="btn btn-outline btn-sm"
                >
                  {t('exams.addSection')}
                </button>
              </div>
              
              {totalMarks !== formData.maxMarks && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
                  <p className="text-sm">
                    ⚠️ {t('exams.totalSectionMarks')} ({totalMarks}) {t('exams.marksExceedTotal')} ({formData.maxMarks}).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('exams.instructions')}
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={10}
                  className="form-textarea w-full"
                  placeholder={t('exams.enterResultsInstructions')}
                ></textarea>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {t('exams.createExamInstructions')}
                </p>
              </div>
            </div>
          )}
          
          {/* Form Controls - Desktop Hidden (they're in the header) */}
          <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => navigate('/exams')}
              className="btn btn-outline"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamCreate;