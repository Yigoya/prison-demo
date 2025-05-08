import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const SystemSettings = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.settings')}
        subtitle={t('admin.title')}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          System settings implementation coming soon...
        </p>
      </div>
    </div>
  );
};

export default SystemSettings;