import React, { forwardRef } from 'react';

interface Grade {
  code: string;
  title: string;
  hours: number;
  ects: number;
  grade: string;
  value: number;
}

interface GradeReportProps {
  person: any; // Student or Member
  grades: Grade[];
  academicYear: string;
  semester: string;
  department: string;
  batchNo: string;
  program: string;
  average: number;
  totalEcts: number;
  totalValue: number;
  dateIssued: string;
}

const GradeReport = forwardRef<HTMLDivElement, GradeReportProps>(
  (
    {
      person,
      grades,
      academicYear,
      semester,
      department,
      batchNo,
      program,
      average,
      totalEcts,
      totalValue,
      dateIssued,
    },
    ref
  ) => (
    <div
      ref={ref}
      className="bg-white p-8 max-w-[900px] mx-auto text-black print:bg-white print:text-black border border-gray-300 rounded shadow text-[15px]"
      style={{ fontFamily: 'serif' }}
    >
      <div className="flex flex-col items-center mb-2">
        <img src="/logo.png" alt="College Logo" className="h-16 mb-2" />
        <h2 className="font-bold text-lg text-center">ETHIOPIAN PRISON POLICE COLLEGE OFFICE OF THE REGISTRAR</h2>
        <div className="text-center font-semibold">CADET OFFICER'S GRADE REPORT</div>
      </div>
      <ul className="mb-2 text-sm list-disc pl-6">
        <li><b>Cadet Officer's Name:</b> {person.studentName} {person.fatherName}</li>
        <li><b>ID No:</b> {person.id}</li>
        <li><b>Sex:</b> {person.gender}</li>
        <li><b>Program:</b> {program}</li>
        <li><b>Batch No:</b> {batchNo}</li>
        <li><b>Academic Year:</b> {academicYear}</li>
        <li><b>{semester}</b></li>
      </ul>
      <table className="w-full border border-black mb-2 text-sm">
        <thead>
          <tr>
            <th className="border border-black px-2">Module Code</th>
            <th className="border border-black px-2">Module Title</th>
            <th className="border border-black px-2">Hrs</th>
            <th className="border border-black px-2">ECTS</th>
            <th className="border border-black px-2">Grade</th>
            <th className="border border-black px-2">ECTS Pt./Grade Value</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g, idx) => (
            <tr key={g.code}>
              <td className="border border-black px-2 text-center">{g.code}</td>
              <td className="border border-black px-2">{g.title}</td>
              <td className="border border-black px-2 text-center">{g.hours}</td>
              <td className="border border-black px-2 text-center">{g.ects}</td>
              <td className="border border-black px-2 text-center">{g.grade}</td>
              <td className="border border-black px-2 text-center">{g.value}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="border border-black px-2 font-semibold">Semester Average: {average}</td>
            <td className="border border-black px-2 text-center font-semibold">{grades.reduce((a, g) => a + g.hours, 0)}</td>
            <td className="border border-black px-2 text-center font-semibold">{totalEcts}</td>
            <td className="border border-black px-2"></td>
            <td className="border border-black px-2 text-center font-semibold">{totalValue}</td>
          </tr>
        </tfoot>
      </table>
      <table className="w-full border border-black mb-2 text-sm">
        <thead>
          <tr>
            <th className="border border-black px-2">Summary</th>
            <th className="border border-black px-2">ECTS</th>
            <th className="border border-black px-2">Total</th>
            <th className="border border-black px-2">Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black px-2">Semester</td>
            <td className="border border-black px-2 text-center">{totalEcts}</td>
            <td className="border border-black px-2 text-center">{totalValue}</td>
            <td className="border border-black px-2 text-center">{average}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-xs mt-2">
        <b>ECTS</b> (European Credit Transfer System) Hrs- Hours, <b>ECTS Pt.</b> - ECTS Point<br />
        1 ECTS = 25-30 Hours.<br />
        <ul className="list-disc pl-6">
          <li>Academics Status: <b>Pass</b></li>
          <li>Date of issued {dateIssued}</li>
        </ul>
        <div className="mt-2">This grade report is invalid unless it bears the official seal Registrar Office and signature of the officer..........digital signature....................</div>
        <div className="mt-2">ፊርማ፡፡<br />06/06/20 Registrar</div>
      </div>
    </div>
  )
);

export default GradeReport; 