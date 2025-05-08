import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const AcademicReports = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('reports.academic')}
        subtitle={t('reports.title')}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Academic reports implementation coming soon...
        </p>
      </div>
    </div>
  );
};

export default AcademicReports;