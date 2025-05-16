import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const StudentDetails: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <PageHeader 
        title={t('students.details')} 
        subtitle={`${t('students.id')}: ${id}`}
      />
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for student details - you can expand this later */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('students.personalInfo')}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{t('students.name')}: Loading...</p>
              <p className="text-sm text-gray-600">{t('students.registrationNumber')}: Loading...</p>
              <p className="text-sm text-gray-600">{t('students.dateOfBirth')}: Loading...</p>
              <p className="text-sm text-gray-600">{t('students.gender')}: Loading...</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('students.academicInfo')}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{t('students.gradeLevel')}: Loading...</p>
              <p className="text-sm text-gray-600">{t('students.section')}: Loading...</p>
              <p className="text-sm text-gray-600">{t('students.academicYear')}: Loading...</p>
              <p className="text-sm text-gray-600">{t('students.status')}: Loading...</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('students.contactInfo')}</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{t('students.address')}: Loading...</p>
            <p className="text-sm text-gray-600">{t('students.phone')}: Loading...</p>
            <p className="text-sm text-gray-600">{t('students.email')}: Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;