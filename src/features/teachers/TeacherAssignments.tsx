import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import DataTable from '../../components/ui/DataTable';
import { Save, X, Plus, Filter, Calendar, Clock, Book, Users } from 'lucide-react';

// Mock data for courses
const mockCourses = [
  { id: 1, code: 'MATH101', name: 'Calculus I', department: 'Mathematics', creditHours: 3 },
  { id: 2, code: 'MATH201', name: 'Linear Algebra', department: 'Mathematics', creditHours: 3 },
  { id: 3, code: 'MATH301', name: 'Differential Equations', department: 'Mathematics', creditHours: 4 },
  { id: 4, code: 'CS101', name: 'Introduction to Programming', department: 'Computer Science', creditHours: 3 },
  { id: 5, code: 'CS201', name: 'Data Structures', department: 'Computer Science', creditHours: 4 },
  { id: 6, code: 'CS301', name: 'Algorithms', department: 'Computer Science', creditHours: 3 },
  { id: 7, code: 'PHYS101', name: 'Physics I', department: 'Physics', creditHours: 4 },
  { id: 8, code: 'PHYS201', name: 'Quantum Mechanics', department: 'Physics', creditHours: 3 },
  { id: 9, code: 'CHEM101', name: 'General Chemistry', department: 'Chemistry', creditHours: 3 },
  { id: 10, code: 'BIO101', name: 'Biology I', department: 'Biology', creditHours: 3 },
];

// Mock data for teachers
const mockTeachers = [
  { id: 1, name: 'Dr. Abebe Kebede', department: 'Mathematics', qualification: 'PhD in Mathematics' },
  { id: 2, name: 'Prof. Tigist Haile', department: 'Computer Science', qualification: 'PhD in Computer Science' },
  { id: 3, name: 'Mr. Solomon Tadesse', department: 'Physics', qualification: 'MSc in Physics' },
  { id: 4, name: 'Mrs. Bethlehem Assefa', department: 'Languages', qualification: 'MA in English Literature' },
  { id: 5, name: 'Dr. Yonas Mulugeta', department: 'Chemistry', qualification: 'PhD in Chemistry' },
  { id: 6, name: 'Ms. Hiwot Gebre', department: 'Biology', qualification: 'MSc in Biology' },
];

// Mock data for existing assignments
const mockAssignments = [
  { 
    id: 1, 
    teacherId: 1, 
    courseId: 1, 
    academicYear: '2023/2024', 
    semester: 'First', 
    schedule: 'Mon, Wed, Fri 9:00 - 10:30',
    classroom: 'Room 101',
    students: 45,
  },
  { 
    id: 2, 
    teacherId: 1, 
    courseId: 2, 
    academicYear: '2023/2024', 
    semester: 'First', 
    schedule: 'Tue, Thu 11:00 - 12:30',
    classroom: 'Room 203',
    students: 38,
  },
  { 
    id: 3, 
    teacherId: 2, 
    courseId: 4, 
    academicYear: '2023/2024', 
    semester: 'First', 
    schedule: 'Mon, Wed 14:00 - 15:30',
    classroom: 'Computer Lab 1',
    students: 30,
  },
  { 
    id: 4, 
    teacherId: 2, 
    courseId: 5, 
    academicYear: '2023/2024', 
    semester: 'First', 
    schedule: 'Tue, Thu 14:00 - 16:00',
    classroom: 'Computer Lab 2',
    students: 25,
  },
  { 
    id: 5, 
    teacherId: 3, 
    courseId: 7, 
    academicYear: '2023/2024', 
    semester: 'First', 
    schedule: 'Mon, Wed, Fri 11:00 - 12:30',
    classroom: 'Physics Lab',
    students: 40,
  },
];

const TeacherAssignments = () => {
  const { t } = useLanguage();
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [teacherFilter, setTeacherFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  
  // Form state for new assignment
  const [newAssignment, setNewAssignment] = useState({
    teacherId: '',
    courseId: '',
    academicYear: '2023/2024',
    semester: 'First',
    schedule: '',
    classroom: '',
    students: 0,
  });
  
  // Filter assignments based on selected filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesTeacher = teacherFilter === 'all' || assignment.teacherId === parseInt(teacherFilter);
    const matchesCourse = courseFilter === 'all' || assignment.courseId === parseInt(courseFilter);
    const matchesSemester = semesterFilter === 'all' || assignment.semester === semesterFilter;
    
    return matchesTeacher && matchesCourse && matchesSemester;
  });
  
  // Get course and teacher info for display
  const getCourseName = (courseId) => {
    const course = mockCourses.find(c => c.id === courseId);
    return course ? `${course.code} - ${course.name}` : 'Unknown Course';
  };
  
  const getTeacherName = (teacherId) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: name === 'teacherId' || name === 'courseId' ? parseInt(value) : value,
    });
  };
  
  const handleStudentsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setNewAssignment({
      ...newAssignment,
      students: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add new assignment
    const newAssignmentWithId = {
      ...newAssignment,
      id: assignments.length + 1,
    };
    
    setAssignments([...assignments, newAssignmentWithId]);
    setShowAssignmentModal(false);
    
    // Reset form
    setNewAssignment({
      teacherId: '',
      courseId: '',
      academicYear: '2023/2024',
      semester: 'First',
      schedule: '',
      classroom: '',
      students: 0,
    });
  };
  
  const handleDeleteAssignment = (assignmentId) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
    }
  };
  
  // Define columns for the data table
  const columns = [
    {
      header: 'Teacher',
      accessor: (assignment) => getTeacherName(assignment.teacherId),
      sortable: true,
    },
    {
      header: 'Course',
      accessor: (assignment) => getCourseName(assignment.courseId),
      sortable: true,
    },
    {
      header: 'Academic Year',
      accessor: 'academicYear',
      sortable: true,
    },
    {
      header: 'Semester',
      accessor: 'semester',
      sortable: true,
    },
    {
      header: 'Schedule',
      accessor: (assignment) => (
        <div className="flex items-center">
          <Clock size={14} className="mr-1 text-gray-400" />
          <span>{assignment.schedule}</span>
        </div>
      ),
    },
    {
      header: 'Classroom',
      accessor: (assignment) => (
        <div className="flex items-center">
          <Book size={14} className="mr-1 text-gray-400" />
          <span>{assignment.classroom}</span>
        </div>
      ),
    },
    {
      header: 'Students',
      accessor: (assignment) => (
        <div className="flex items-center">
          <Users size={14} className="mr-1 text-gray-400" />
          <span>{assignment.students}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (assignment) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleDeleteAssignment(assignment.id)}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Delete Assignment"
          >
            <X size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('teachers.assignments')}
        </h1>
        <button
          onClick={() => setShowAssignmentModal(true)}
          className="btn btn-primary mt-3 sm:mt-0"
        >
          <Plus size={16} className="mr-1" />
          New Assignment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <Filter size={16} className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Teacher
              </label>
              <select
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">All Teachers</option>
                {mockTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course
              </label>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">All Courses</option>
                {mockCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Semester
              </label>
              <select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">All Semesters</option>
                <option value="First">First Semester</option>
                <option value="Second">Second Semester</option>
                <option value="Summer">Summer Semester</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <DataTable
          data={filteredAssignments}
          columns={columns}
          keyExtractor={(item) => item.id.toString()}
          pagination={true}
          searchable={false}
          emptyMessage="No teacher assignments found with the current filters"
        />
      </div>

      {/* New Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                New Teacher Assignment
              </h3>
              <button
                onClick={() => setShowAssignmentModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Teacher*
                    </label>
                    <select
                      name="teacherId"
                      value={newAssignment.teacherId}
                      onChange={handleInputChange}
                      required
                      className="form-select w-full"
                    >
                      <option value="">Select Teacher</option>
                      {mockTeachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} ({teacher.department})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Course*
                    </label>
                    <select
                      name="courseId"
                      value={newAssignment.courseId}
                      onChange={handleInputChange}
                      required
                      className="form-select w-full"
                    >
                      <option value="">Select Course</option>
                      {mockCourses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.code} - {course.name} ({course.creditHours} cr)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Academic Year*
                    </label>
                    <input
                      type="text"
                      name="academicYear"
                      value={newAssignment.academicYear}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Semester*
                    </label>
                    <select
                      name="semester"
                      value={newAssignment.semester}
                      onChange={handleInputChange}
                      required
                      className="form-select w-full"
                    >
                      <option value="First">First Semester</option>
                      <option value="Second">Second Semester</option>
                      <option value="Summer">Summer Semester</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Schedule*
                    </label>
                    <input
                      type="text"
                      name="schedule"
                      value={newAssignment.schedule}
                      onChange={handleInputChange}
                      required
                      placeholder="E.g., Mon, Wed, Fri 9:00 - 10:30"
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Classroom*
                    </label>
                    <input
                      type="text"
                      name="classroom"
                      value={newAssignment.classroom}
                      onChange={handleInputChange}
                      required
                      placeholder="E.g., Room 101"
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Number of Students
                    </label>
                    <input
                      type="number"
                      name="students"
                      value={newAssignment.students}
                      onChange={handleStudentsChange}
                      min="0"
                      className="form-input w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-right">
                <button
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="btn btn-outline mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Save size={16} className="mr-1" />
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;