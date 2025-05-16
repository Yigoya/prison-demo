import { useState } from 'react';
import { studentReportData } from '../../data/mockData';

interface CoursePerformance {
  name: string;
  grade: string;
  attendance: number;
}

interface StudentData {
  id: number;
  studentId: string;
  name: string;
  enrollmentStatus: string;
  courses: CoursePerformance[];
  gpa: number;
  attendanceRate: number;
}

const StudentReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  const filteredStudents = studentReportData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Performance Report</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by student name or ID..."
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Students</h3>
          <p className="text-2xl font-bold text-primary">{studentReportData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average GPA</h3>
          <p className="text-2xl font-bold text-primary">
            {(studentReportData.reduce((acc, curr) => acc + curr.gpa, 0) / studentReportData.length).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Attendance</h3>
          <p className="text-2xl font-bold text-primary">
            {(studentReportData.reduce((acc, curr) => acc + curr.attendanceRate, 0) / studentReportData.length).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Student List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.studentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.gpa.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-primary hover:text-primary-dark"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium">{selectedStudent.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{selectedStudent.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Enrollment Status</p>
                <p className="font-medium">{selectedStudent.enrollmentStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Overall GPA</p>
                <p className="font-medium">{selectedStudent.gpa.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Overall Attendance</p>
                <p className="font-medium">{selectedStudent.attendanceRate}%</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Course Performance</p>
                <div className="space-y-2">
                  {selectedStudent.courses.map((course, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{course.name}</p>
                      <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                        <div>
                          <span className="text-gray-500">Grade:</span> {course.grade}
                        </div>
                        <div>
                          <span className="text-gray-500">Attendance:</span> {course.attendance}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentReport; 