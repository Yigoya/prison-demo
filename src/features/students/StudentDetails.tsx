import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const StudentDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <PageHeader 
        title="Student Details" 
        description={`Student ID: ${id}`}
      />
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for student details - you can expand this later */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Name: Loading...</p>
              <p className="text-sm text-gray-600">Registration Number: Loading...</p>
              <p className="text-sm text-gray-600">Date of Birth: Loading...</p>
              <p className="text-sm text-gray-600">Gender: Loading...</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Grade Level: Loading...</p>
              <p className="text-sm text-gray-600">Section: Loading...</p>
              <p className="text-sm text-gray-600">Academic Year: Loading...</p>
              <p className="text-sm text-gray-600">Status: Loading...</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Address: Loading...</p>
            <p className="text-sm text-gray-600">Phone: Loading...</p>
            <p className="text-sm text-gray-600">Email: Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;