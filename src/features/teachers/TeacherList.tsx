import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import DataTable from '../../components/ui/DataTable';
import { Plus, UserCog, Trash2, Mail, Phone } from 'lucide-react';

// Mock data for teachers
const mockTeachers = [
  {
    id: 1,
    name: 'Dr. Abebe Kebede',
    gender: 'Male',
    qualification: 'PhD in Mathematics',
    specialization: 'Applied Mathematics',
    experience: '12 years',
    department: 'Mathematics',
    email: 'abebe.kebede@example.com',
    phone: '+251 91 234 5678',
    status: 'Active',
    joinDate: '2018-09-01',
    courses: ['Calculus I', 'Linear Algebra', 'Differential Equations'],
  },
  {
    id: 2,
    name: 'Prof. Tigist Haile',
    gender: 'Female',
    qualification: 'PhD in Computer Science',
    specialization: 'Artificial Intelligence',
    experience: '15 years',
    department: 'Computer Science',
    email: 'tigist.haile@example.com',
    phone: '+251 91 876 5432',
    status: 'Active',
    joinDate: '2015-01-15',
    courses: ['Introduction to AI', 'Machine Learning', 'Neural Networks'],
  },
  {
    id: 3,
    name: 'Mr. Solomon Tadesse',
    gender: 'Male',
    qualification: 'MSc in Physics',
    specialization: 'Quantum Mechanics',
    experience: '8 years',
    department: 'Physics',
    email: 'solomon.tadesse@example.com',
    phone: '+251 92 345 6789',
    status: 'On Leave',
    joinDate: '2019-03-22',
    courses: ['Physics I', 'Quantum Physics', 'Thermodynamics'],
  },
  {
    id: 4,
    name: 'Mrs. Bethlehem Assefa',
    gender: 'Female',
    qualification: 'MA in English Literature',
    specialization: 'Modern Literature',
    experience: '10 years',
    department: 'Languages',
    email: 'bethlehem.assefa@example.com',
    phone: '+251 93 456 7890',
    status: 'Active',
    joinDate: '2017-08-10',
    courses: ['English Composition', 'Literary Analysis', 'Creative Writing'],
  },
  {
    id: 5,
    name: 'Dr. Yonas Mulugeta',
    gender: 'Male',
    qualification: 'PhD in Chemistry',
    specialization: 'Organic Chemistry',
    experience: '14 years',
    department: 'Chemistry',
    email: 'yonas.mulugeta@example.com',
    phone: '+251 94 567 8901',
    status: 'Active',
    joinDate: '2016-05-15',
    courses: ['General Chemistry', 'Organic Chemistry', 'Biochemistry'],
  },
  {
    id: 6,
    name: 'Ms. Hiwot Gebre',
    gender: 'Female',
    qualification: 'MSc in Biology',
    specialization: 'Microbiology',
    experience: '7 years',
    department: 'Biology',
    email: 'hiwot.gebre@example.com',
    phone: '+251 95 678 9012',
    status: 'Active',
    joinDate: '2020-02-01',
    courses: ['Biology I', 'Microbiology', 'Genetics'],
  },
  {
    id: 7,
    name: 'Dr. Dawit Fikre',
    gender: 'Male',
    qualification: 'PhD in Economics',
    specialization: 'Macroeconomics',
    experience: '11 years',
    department: 'Business',
    email: 'dawit.fikre@example.com',
    phone: '+251 96 789 0123',
    status: 'Inactive',
    joinDate: '2017-09-01',
    courses: ['Principles of Economics', 'Macroeconomics', 'International Economics'],
  },
];

const TeacherList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique departments for filter
  const departments = ['all', ...new Set(mockTeachers.map(teacher => teacher.department))];
  
  // Apply filters
  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const columns = [
    {
      header: 'Name',
      accessor: (teacher) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
            {teacher.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900 dark:text-white">{teacher.name}</div>
            <div className="text-xs text-gray-500">{teacher.qualification}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: 'Department',
      accessor: 'department',
      sortable: true,
    },
    {
      header: 'Specialization',
      accessor: 'specialization',
      sortable: true,
    },
    {
      header: 'Experience',
      accessor: 'experience',
      sortable: true,
    },
    {
      header: 'Contact',
      accessor: (teacher) => (
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail size={14} className="mr-1" />
            {teacher.email}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Phone size={14} className="mr-1" />
            {teacher.phone}
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (teacher) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          teacher.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          teacher.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {teacher.status}
        </span>
      ),
      sortable: true,
    },
    {
      header: 'Actions',
      accessor: (teacher) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/teachers/edit/${teacher.id}`);
            }}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="Edit Teacher"
          >
            <UserCog size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Are you sure you want to delete this teacher?')) {
                // Handle delete
                alert(`Teacher ${teacher.name} would be deleted in a real app`);
              }
            }}
            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            title="Delete Teacher"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('teachers.list')}
        </h1>
        <button
          onClick={() => navigate('/teachers/add')}
          className="btn btn-primary mt-3 sm:mt-0"
        >
          <Plus size={16} className="mr-1" />
          Add Teacher
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name, email, specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">All Departments</option>
                {departments.filter(d => d !== 'all').map((department, index) => (
                  <option key={index} value={department}>{department}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select w-full"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <DataTable
          data={filteredTeachers}
          columns={columns}
          keyExtractor={(item) => item.id.toString()}
          onRowClick={(teacher) => navigate(`/teachers/edit/${teacher.id}`)}
          pagination={true}
          searchable={false} // We're using our own search
          emptyMessage="No teachers found with the current filters"
        />
      </div>
    </div>
  );
};

export default TeacherList;