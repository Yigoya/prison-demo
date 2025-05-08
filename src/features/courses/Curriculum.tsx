import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpen, ChevronDown, ChevronRight, Clock, ArrowRight, Book, Filter } from 'lucide-react';

// Mock programs data
const mockPrograms = [
  {
    id: 1,
    name: 'Computer Science',
    description: 'A comprehensive program covering the fundamentals of computer science, programming, and software development.',
    duration: '4 years',
    totalCredits: 120,
    degree: 'Bachelor of Science',
    levels: [
      {
        year: 1,
        title: 'First Year',
        semesters: [
          {
            name: 'First Semester',
            courses: [
              { code: 'CS101', name: 'Introduction to Programming', credits: 3, required: true },
              { code: 'MATH101', name: 'Calculus I', credits: 3, required: true },
              { code: 'PHYS101', name: 'Physics I', credits: 4, required: true },
              { code: 'ENG101', name: 'English Composition', credits: 3, required: true },
              { code: 'GEN101', name: 'General Education I', credits: 3, required: true },
            ]
          },
          {
            name: 'Second Semester',
            courses: [
              { code: 'CS102', name: 'Data Structures', credits: 4, required: true },
              { code: 'MATH102', name: 'Calculus II', credits: 3, required: true },
              { code: 'PHYS102', name: 'Physics II', credits: 4, required: true },
              { code: 'CS103', name: 'Discrete Mathematics', credits: 3, required: true },
              { code: 'GEN102', name: 'General Education II', credits: 3, required: true },
            ]
          },
        ]
      },
      {
        year: 2,
        title: 'Second Year',
        semesters: [
          {
            name: 'First Semester',
            courses: [
              { code: 'CS201', name: 'Object-Oriented Programming', credits: 3, required: true },
              { code: 'CS202', name: 'Database Systems', credits: 3, required: true },
              { code: 'CS203', name: 'Computer Architecture', credits: 3, required: true },
              { code: 'MATH201', name: 'Linear Algebra', credits: 3, required: true },
              { code: 'GEN201', name: 'General Education III', credits: 3, required: true },
            ]
          },
          {
            name: 'Second Semester',
            courses: [
              { code: 'CS204', name: 'Operating Systems', credits: 3, required: true },
              { code: 'CS205', name: 'Algorithms', credits: 3, required: true },
              { code: 'CS206', name: 'Software Engineering', credits: 3, required: true },
              { code: 'STAT201', name: 'Probability and Statistics', credits: 3, required: true },
              { code: 'GEN202', name: 'General Education IV', credits: 3, required: true },
            ]
          },
        ]
      },
    ]
  },
  {
    id: 2,
    name: 'Mathematics',
    description: 'A rigorous program in pure and applied mathematics preparing students for advanced studies or professional careers.',
    duration: '3 years',
    totalCredits: 110,
    degree: 'Bachelor of Science',
    levels: [
      {
        year: 1,
        title: 'First Year',
        semesters: [
          {
            name: 'First Semester',
            courses: [
              { code: 'MATH101', name: 'Calculus I', credits: 3, required: true },
              { code: 'MATH103', name: 'Mathematical Logic', credits: 3, required: true },
              { code: 'PHYS101', name: 'Physics I', credits: 4, required: true },
              { code: 'ENG101', name: 'English Composition', credits: 3, required: true },
              { code: 'GEN101', name: 'General Education I', credits: 3, required: true },
            ]
          },
          {
            name: 'Second Semester',
            courses: [
              { code: 'MATH102', name: 'Calculus II', credits: 3, required: true },
              { code: 'MATH104', name: 'Number Theory', credits: 3, required: true },
              { code: 'STAT101', name: 'Introduction to Statistics', credits: 3, required: true },
              { code: 'CS101', name: 'Introduction to Programming', credits: 3, required: true },
              { code: 'GEN102', name: 'General Education II', credits: 3, required: true },
            ]
          },
        ]
      },
      {
        year: 2,
        title: 'Second Year',
        semesters: [
          {
            name: 'First Semester',
            courses: [
              { code: 'MATH201', name: 'Linear Algebra', credits: 3, required: true },
              { code: 'MATH203', name: 'Differential Equations', credits: 4, required: true },
              { code: 'MATH205', name: 'Abstract Algebra I', credits: 3, required: true },
              { code: 'PHYS201', name: 'Mathematical Physics', credits: 3, required: true },
              { code: 'GEN201', name: 'General Education III', credits: 3, required: true },
            ]
          },
          {
            name: 'Second Semester',
            courses: [
              { code: 'MATH202', name: 'Multivariable Calculus', credits: 3, required: true },
              { code: 'MATH204', name: 'Complex Analysis', credits: 3, required: true },
              { code: 'MATH206', name: 'Abstract Algebra II', credits: 3, required: true },
              { code: 'STAT201', name: 'Probability Theory', credits: 3, required: true },
              { code: 'GEN202', name: 'General Education IV', credits: 3, required: true },
            ]
          },
        ]
      },
    ]
  },
];

const Curriculum = () => {
  const { t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState(mockPrograms[0]);
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({ 1: true });

  const toggleLevel = (levelYear: number) => {
    setExpandedLevels({
      ...expandedLevels,
      [levelYear]: !expandedLevels[levelYear],
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <BookOpen size={24} className="mr-2 text-primary" />
          {t('courses.curriculum')}
        </h1>
      </div>

      {/* Program Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <Filter size={16} className="mr-2 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Select Program</h2>
        </div>
        <div className="p-4">
          <select
            value={selectedProgram.id}
            onChange={(e) => {
              const program = mockPrograms.find(p => p.id === parseInt(e.target.value));
              if (program) {
                setSelectedProgram(program);
                setExpandedLevels({ 1: true }); // Reset expanded levels
              }
            }}
            className="form-select w-full md:w-72"
          >
            {mockPrograms.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.degree})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Program Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {selectedProgram.name} Program Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Degree</h3>
            <p className="text-gray-700 dark:text-gray-300">{selectedProgram.degree}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Duration</h3>
            <p className="text-gray-700 dark:text-gray-300">{selectedProgram.duration}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Total Credits</h3>
            <p className="text-gray-700 dark:text-gray-300">{selectedProgram.totalCredits} credits</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Description</h3>
          <p className="text-gray-700 dark:text-gray-300">{selectedProgram.description}</p>
        </div>
      </div>

      {/* Curriculum Structure */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Curriculum Structure</h2>
        </div>
        
        <div className="p-6">
          {selectedProgram.levels.map((level) => (
            <div key={level.year} className="mb-6 last:mb-0">
              <div 
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => toggleLevel(level.year)}
              >
                <div className="flex items-center">
                  {expandedLevels[level.year] ? (
                    <ChevronDown size={20} className="mr-2 text-primary" />
                  ) : (
                    <ChevronRight size={20} className="mr-2 text-primary" />
                  )}
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {level.title}
                  </h3>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {level.semesters.reduce((total, semester) => 
                    total + semester.courses.reduce((sum, course) => sum + course.credits, 0)
                  , 0)} credits
                </div>
              </div>
              
              {expandedLevels[level.year] && (
                <div className="mt-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                  {level.semesters.map((semester, semIndex) => (
                    <div key={semIndex} className="mb-6 last:mb-0">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        {semester.name}
                      </h4>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Course Code
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Course Name
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Credits
                              </th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Required
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {semester.courses.map((course, courseIndex) => (
                              <tr key={courseIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  {course.code}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {course.name}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center">
                                    <Clock size={14} className="mr-1 text-gray-400" />
                                    {course.credits}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {course.required ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      Required
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                      Elective
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white text-right">
                                Total Credits:
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                {semester.courses.reduce((sum, course) => sum + course.credits, 0)}
                              </td>
                              <td></td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  ))}
                  
                  {/* Progression arrow between years */}
                  {level.year < selectedProgram.levels.length && (
                    <div className="flex justify-center my-6">
                      <ArrowRight size={24} className="text-primary" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;