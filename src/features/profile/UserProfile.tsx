import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const UserProfile = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('profile.title')}
        subtitle={t('profile.personalInfo')}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          User profile implementation coming soon...
        </p>
      </div>
    </div>
  );
};

export default UserProfile;