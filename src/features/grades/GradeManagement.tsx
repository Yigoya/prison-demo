import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const GradeManagement = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('grades.manage')}
        subtitle={t('grades.title')}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Grade management implementation coming soon...
        </p>
      </div>
    </div>
  );
};

export default GradeManagement;