import React, { forwardRef } from 'react';

interface Course {
  code: string;
  title: string;
}

interface RegistrationSlipProps {
  person: any; // Student or Member
  courses: Course[];
  academicYear: string;
  semester: string;
  department: string;
  batchNo: string;
  typeOfProgram: string;
}

const RegistrationSlip = forwardRef<HTMLDivElement, RegistrationSlipProps>(
  (
    { person, courses, academicYear, semester, department, batchNo, typeOfProgram },
    ref
  ) => (
    <div
      ref={ref}
      className="bg-white p-8 max-w-[700px] mx-auto text-black print:bg-white print:text-black border border-gray-300 rounded shadow"
      style={{ fontFamily: 'serif' }}
    >
      <div className="flex flex-col items-center mb-4">
        <img src="/logo.png" alt="College Logo" className="h-16 mb-2" />
        <h2 className="font-bold text-lg text-center">ETHIOPIAN PRISON POLICE COLLEGE</h2>
        <div className="text-center text-sm">Office Of The Registrar form(slip)</div>
      </div>
      <div className="mb-2 text-sm">
        <span><b>Name:</b> {person.studentName} <b>Grandfather name:</b> {person.grandfatherName}</span><br />
        <span><b>ID No:</b> {person.id} <b>Sex:</b> {person.gender}</span><br />
        <span><b>Type of Program:</b> {typeOfProgram}</span><br />
        <span><b>Batch No:</b> {batchNo}</span><br />
        <span>
          <b>Academic Year:</b> {academicYear} <b>Year:</b> {person.year || '1'} <b>Semester:</b> {semester} <b>Department:</b> {department}
        </span>
      </div>
      <table className="w-full border border-black mb-4 text-sm">
        <thead>
          <tr>
            <th className="border border-black px-2">No</th>
            <th className="border border-black px-2">Module Code</th>
            <th className="border border-black px-2">Module Title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, idx) => (
            <tr key={course.code}>
              <td className="border border-black px-2 text-center">{idx + 1}</td>
              <td className="border border-black px-2 text-center">{course.code}</td>
              <td className="border border-black px-2">{course.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-8 text-sm">
        <div>
          Student signature: ____________ <br />
          date: ____________
        </div>
        <div>
          Approved by: ____________ <br />
          date: ____________ <br />
          signature: ____________
        </div>
      </div>
    </div>
  )
);

export default RegistrationSlip; 