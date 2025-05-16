import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { attendanceReportData } from '../../data/mockData';

interface CourseAttendance {
  name: string;
  attendance: number;
}

interface AttendanceData {
  id: number;
  month: string;
  totalClasses: number;
  averageAttendance: number;
  courses: CourseAttendance[];
}

const AttendanceReport = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance Report</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Attendance Rate</h3>
          <p className="text-2xl font-bold text-primary">
            {(attendanceReportData.reduce((acc, curr) => acc + curr.averageAttendance, 0) / attendanceReportData.length).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Classes</h3>
          <p className="text-2xl font-bold text-primary">
            {attendanceReportData.reduce((acc, curr) => acc + curr.totalClasses, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Reporting Period</h3>
          <p className="text-2xl font-bold text-primary">
            {attendanceReportData[0]?.month} - {attendanceReportData[attendanceReportData.length - 1]?.month}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Attendance Trends</h2>
        <div className="w-full overflow-x-auto">
          <LineChart
            width={800}
            height={300}
            data={attendanceReportData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="averageAttendance" stroke="#8884d8" name="Average Attendance (%)" />
          </LineChart>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Classes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Breakdown</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceReportData.map((month: AttendanceData) => (
              <tr key={month.id}>
                <td className="px-6 py-4 whitespace-nowrap">{month.month}</td>
                <td className="px-6 py-4 whitespace-nowrap">{month.totalClasses}</td>
                <td className="px-6 py-4 whitespace-nowrap">{month.averageAttendance}%</td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {month.courses.map((course, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-medium">{course.name}:</span> {course.attendance}%
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReport; 