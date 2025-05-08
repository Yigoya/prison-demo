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
      { name: 'Section 1', marks: 0, questions: 0, description: '' },
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
      alert(`The total marks from all sections (${totalMarks}) must equal the maximum marks (${formData.maxMarks}).`);
      return;
    }
    
    // Show success message
    alert(`Exam ${isEditing ? 'updated' : 'created'} successfully!`);
    
    // Navigate back to exam list
    navigate('/exams');
  };
  
  const tabs = [
    { id: 'basic', label: 'Basic Information' },
    { id: 'sections', label: 'Exam Sections' },
    { id: 'instructions', label: 'Instructions' },
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
            Cancel
          </button>
          <button
            type="submit"
            form="exam-form"
            className="btn btn-primary"
          >
            <Save size={16} className="mr-1" />
            Save
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
                  {formData.status}
                </span>
              </div>
              
              <div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select text-sm"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          )}

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course*
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleCourseChange}
                  required
                  className="form-select w-full"
                  data-examtype={formData.examType}
                >
                  <option value="">Select Course</option>
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
                  Exam Type*
                </label>
                <select
                  name="examType"
                  value={formData.examType}
                  onChange={handleExamTypeChange}
                  required
                  className="form-select w-full"
                >
                  <option value="Quiz">Quiz</option>
                  <option value="Midterm">Midterm</option>
                  <option value="Final">Final</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Practical">Practical</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Exam Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="E.g., Midterm Exam - Introduction to Programming"
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date*
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
                    Start Time*
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
                    End Time*
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
                  Venue*
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
                    <option value="">Select Venue</option>
                    {mockVenues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name} (Capacity: {venue.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maximum Marks*
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
                    Passing Marks*
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
                  Exam Sections
                </h3>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total: {totalMarks}/{formData.maxMarks} marks, {totalQuestions} questions
                </div>
              </div>
              
              {formData.sections.map((section, index) => (
                <div 
                  key={index} 
                  className="p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Section {index + 1}
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
                        Section Name*
                      </label>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => handleSectionChange(index, 'name', e.target.value)}
                        required
                        className="form-input w-full"
                        placeholder="E.g., Multiple Choice"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Number of Questions*
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
                        Marks for this Section*
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
                        Description
                      </label>
                      <input
                        type="text"
                        value={section.description}
                        onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                        className="form-input w-full"
                        placeholder="E.g., 15 multiple choice questions, 2 marks each"
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
                  Add Section
                </button>
              </div>
              
              {totalMarks !== formData.maxMarks && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
                  <p className="text-sm">
                    ⚠️ The total marks from all sections ({totalMarks}) must equal the maximum marks ({formData.maxMarks}).
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
                  Exam Instructions
                </label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={10}
                  className="form-textarea w-full"
                  placeholder="Enter exam instructions here..."
                ></textarea>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  These instructions will be printed on the exam sheet and visible to students.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                  Sample Instructions
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Answer all questions in the provided answer booklet.</li>
                  <li>Write your name, ID, and section on each answer sheet.</li>
                  <li>Use blue or black pen only.</li>
                  <li>No electronic devices allowed except for basic calculators (for relevant courses).</li>
                  <li>All rough work should be done on the answer sheet and must be crossed out.</li>
                  <li>Any form of academic dishonesty will result in an automatic failure.</li>
                </ul>
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
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamCreate;