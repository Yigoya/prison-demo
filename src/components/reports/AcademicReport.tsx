import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { academicReportData } from '../../data/mockData';

const AcademicReport = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Academic Performance Report</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Pass Rate</h3>
          <p className="text-2xl font-bold text-primary">
            {(academicReportData.reduce((acc, curr) => acc + curr.passRate, 0) / academicReportData.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Grade</h3>
          <p className="text-2xl font-bold text-primary">
            {(academicReportData.reduce((acc, curr) => acc + curr.averageGrade, 0) / academicReportData.length).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Courses</h3>
          <p className="text-2xl font-bold text-primary">{academicReportData.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Course Performance Overview</h2>
        <div className="w-full overflow-x-auto">
          <BarChart
            width={800}
            height={300}
            data={academicReportData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="passRate" fill="#8884d8" name="Pass Rate (%)" />
            <Bar dataKey="averageGrade" fill="#82ca9d" name="Average Grade" />
          </BarChart>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {academicReportData.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">{course.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.totalStudents}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.passRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.averageGrade.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicReport; 