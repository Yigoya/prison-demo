import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Save, X, Upload } from 'lucide-react';

const StudentRegistration = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    grandfatherName: '',
    gender: '',
    motherName: '',
    registrationDate: new Date().toISOString().split('T')[0],
    educationStartDate: '',
    educationEndDate: '',
    durationOfEducation: '',
    phoneNumber: '',
    email: '',
    religion: '',
    nationality: '',
    dateOfBirth: '',
    age: '',
    regionOfOrigin: '',
    zone: '',
    district: '',
    specificPlace: '',
    institutionName: '',
    academicYear: '',
    typeOfEducation: '',
    previousEducationType: '',
    previousInstitution: '',
    department: '',
    photo: null,
    batchNumber: '',
    // For inmates only
    isInmate: false,
    sentenceDuration: '',
    typeOfCrime: '',
    currentStatus: '',
    residingZone: '',
    imprisonmentStartDate: '',
    imprisonmentEndDateWithParole: '',
    imprisonmentEndDateWithoutParole: '',
    languageOfInstruction: '',
    specialSupportRequired: false,
    specialSupportDetails: '',
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to save student registration
    console.log('Form submitted:', formData);
    alert('Student registration submitted successfully!');
  };

  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'education', label: 'Education Details' },
    { id: 'contact', label: 'Contact Information' },
    { id: 'inmate', label: 'Inmate Details' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('students.register')}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            <X size={16} className="mr-1" />
            Cancel
          </button>
          <button
            type="submit"
            form="registration-form"
            className="btn btn-primary"
          >
            <Save size={16} className="mr-1" />
            Save
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary dark:border-primary dark:text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Form */}
        <form id="registration-form" onSubmit={handleSubmit} className="p-6">
          {/* Photo upload area */}
          <div className="mb-8 flex flex-col items-center sm:items-start sm:flex-row gap-6">
            <div className="w-32 h-32 relative rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              {photoPreview ? (
                <img 
                  src={photoPreview} 
                  alt="Student photo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <Upload size={24} className="mx-auto text-gray-400" />
                  <p className="text-xs text-gray-500 mt-1">Upload Photo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Student Photo
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Upload a clear passport size photo of the student
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Recommended size: 300x300px (Max 5MB)
              </div>
            </div>
          </div>

          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student's Name*
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Father's Name*
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Grandfather's Name
                </label>
                <input
                  type="text"
                  name="grandfatherName"
                  value={formData.grandfatherName}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mother's Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="form-select w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth*
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nationality*
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Religion
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
            </div>
          )}

          {/* Education Details Tab */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Institution Name*
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Academic Year*
                </label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type of Education Being Pursued*
                </label>
                <input
                  type="text"
                  name="typeOfEducation"
                  value={formData.typeOfEducation}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Previous Type of Education
                </label>
                <input
                  type="text"
                  name="previousEducationType"
                  value={formData.previousEducationType}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Previous Institution
                </label>
                <input
                  type="text"
                  name="previousInstitution"
                  value={formData.previousInstitution}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department*
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Batch Number
                </label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Registration Date*
                </label>
                <input
                  type="date"
                  name="registrationDate"
                  value={formData.registrationDate}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Education Start Date*
                </label>
                <input
                  type="date"
                  name="educationStartDate"
                  value={formData.educationStartDate}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Education End Date
                </label>
                <input
                  type="date"
                  name="educationEndDate"
                  value={formData.educationEndDate}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration of Education (in months)
                </label>
                <input
                  type="number"
                  name="durationOfEducation"
                  value={formData.durationOfEducation}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Language of Instruction
                </label>
                <input
                  type="text"
                  name="languageOfInstruction"
                  value={formData.languageOfInstruction}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div className="col-span-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="specialSupportRequired"
                    name="specialSupportRequired"
                    checked={formData.specialSupportRequired}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="specialSupportRequired" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Special Support Required
                  </label>
                </div>
                
                {formData.specialSupportRequired && (
                  <div className="mt-3">
                    <textarea
                      name="specialSupportDetails"
                      value={formData.specialSupportDetails}
                      onChange={handleInputChange}
                      placeholder="Please specify the type of special support needed..."
                      className="form-textarea w-full"
                      rows={3}
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Region of Origin
                </label>
                <input
                  type="text"
                  name="regionOfOrigin"
                  value={formData.regionOfOrigin}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Zone
                </label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specific Place
                </label>
                <input
                  type="text"
                  name="specificPlace"
                  value={formData.specificPlace}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
            </div>
          )}

          {/* Inmate Details Tab */}
          {activeTab === 'inmate' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isInmate"
                    name="isInmate"
                    checked={formData.isInmate}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="isInmate" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    This student is an inmate
                  </label>
                </div>
              </div>
              
              {formData.isInmate && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Sentence Duration (in years)
                    </label>
                    <input
                      type="text"
                      name="sentenceDuration"
                      value={formData.sentenceDuration}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type of Crime
                    </label>
                    <input
                      type="text"
                      name="typeOfCrime"
                      value={formData.typeOfCrime}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Status
                    </label>
                    <select
                      name="currentStatus"
                      value={formData.currentStatus}
                      onChange={handleInputChange}
                      className="form-select w-full"
                    >
                      <option value="">Select Status</option>
                      <option value="serving">Serving Sentence</option>
                      <option value="parole">On Parole</option>
                      <option value="probation">On Probation</option>
                      <option value="released">Released</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Residing Zone
                    </label>
                    <input
                      type="text"
                      name="residingZone"
                      value={formData.residingZone}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Imprisonment Start Date
                    </label>
                    <input
                      type="date"
                      name="imprisonmentStartDate"
                      value={formData.imprisonmentStartDate}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Imprisonment End Date with Parole
                    </label>
                    <input
                      type="date"
                      name="imprisonmentEndDateWithParole"
                      value={formData.imprisonmentEndDateWithParole}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Imprisonment End Date without Parole
                    </label>
                    <input
                      type="date"
                      name="imprisonmentEndDateWithoutParole"
                      value={formData.imprisonmentEndDateWithoutParole}
                      onChange={handleInputChange}
                      className="form-input w-full"
                    />
                  </div>
                </div>
              )}
              
              {!formData.isInmate && (
                <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                  <p>Inmate details are only required for students who are inmates.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Form Controls - Desktop Hidden (they're in the header) */}
          <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;