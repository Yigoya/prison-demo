import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';
import { ArrowLeft, Save, X, Upload } from 'lucide-react';

interface FormData {
  title: string;
  studentName: string;
  fatherName: string;
  grandfatherName: string;
  gender: string;
  motherName: string;
  registrationDate: string;
  educationStartDate: string;
  educationEndDate: string;
  durationOfStudy: string;
  phoneNumber: string;
  email: string;
  religion: string;
  nationality: string;
  dateOfBirth: string;
  age: string;
  regionOfOrigin: string;
  zone: string;
  district: string;
  specificPlace: string;
  institutionName: string;
  employmentPeriod: string;
  typeOfEducation: string;
  previousTypeOfEducation: string;
  previousInstitution: string;
  department: string;
  photo: File | null;
  roundPhase: string;
  identificationNumber: string;
}

const MemberRegistration = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    studentName: '',
    fatherName: '',
    grandfatherName: '',
    gender: '',
    motherName: '',
    registrationDate: new Date().toISOString().split('T')[0],
    educationStartDate: '',
    educationEndDate: '',
    durationOfStudy: '',
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
    employmentPeriod: '',
    typeOfEducation: '',
    previousTypeOfEducation: '',
    previousInstitution: '',
    department: '',
    photo: null,
    roundPhase: '',
    identificationNumber: ''
  });

  const [photoPreview, setPhotoPreview] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    navigate('/members');
  };

  const tabs = [
    { id: 'personal', label: t('members.personalInfo') },
    { id: 'education', label: t('members.educationInfo') },
    { id: 'contact', label: t('members.contactInfo') },
    { id: 'employment', label: t('members.employmentInfo') },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('members.registration')}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate('/members')}
            className="btn btn-outline"
          >
            <X size={16} className="mr-1" />
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            form="registration-form"
            className="btn btn-primary"
          >
            <Save size={16} className="mr-1" />
            {t('common.save')}
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
                  alt="Member photo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <Upload size={24} className="mx-auto text-gray-400" />
                  <p className="text-xs text-gray-500 mt-1">{t('common.uploadPhoto')}</p>
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
                {t('members.photo')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {t('members.photoDescription')}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('members.photoRequirements')}
              </div>
            </div>
          </div>

          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.title')}*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.studentName')}*
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
                  {t('members.fatherName')}*
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
                  {t('members.grandfatherName')}
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
                  {t('members.motherName')}
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
                  {t('members.gender')}*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="form-select w-full"
                >
                  <option value="">{t('common.select')}</option>
                  <option value="male">{t('common.male')}</option>
                  <option value="female">{t('common.female')}</option>
                  <option value="other">{t('common.other')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.dateOfBirth')}*
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
                  {t('members.age')}
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
                  {t('members.nationality')}*
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
                  {t('members.religion')}
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

          {/* Education Information Tab */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.registrationDate')}*
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
                  {t('members.educationStartDate')}*
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
                  {t('members.educationEndDate')}
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
                  {t('members.durationOfStudy')}
                </label>
                <input
                  type="text"
                  name="durationOfStudy"
                  value={formData.durationOfStudy}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.typeOfEducation')}*
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
                  {t('members.previousTypeOfEducation')}
                </label>
                <input
                  type="text"
                  name="previousTypeOfEducation"
                  value={formData.previousTypeOfEducation}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.previousInstitution')}
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
                  {t('members.department')}*
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
            </div>
          )}

          {/* Contact Information Tab */}
          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.phoneNumber')}*
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
                  {t('members.email')}
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
                  {t('members.regionOfOrigin')}
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
                  {t('members.zone')}
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
                  {t('members.district')}
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
                  {t('members.specificPlace')}
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

          {/* Employment Information Tab */}
          {activeTab === 'employment' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.institutionName')}*
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
                  {t('members.employmentPeriod')}*
                </label>
                <input
                  type="text"
                  name="employmentPeriod"
                  value={formData.employmentPeriod}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.roundPhase')}*
                </label>
                <input
                  type="text"
                  name="roundPhase"
                  value={formData.roundPhase}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('members.identificationNumber')}*
                </label>
                <input
                  type="text"
                  name="identificationNumber"
                  value={formData.identificationNumber}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full"
                />
              </div>
            </div>
          )}
          
          {/* Form Controls - Desktop Hidden (they're in the header) */}
          <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => navigate('/members')}
              className="btn btn-outline"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberRegistration; 