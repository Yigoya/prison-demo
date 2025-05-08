import { useLanguage } from '../../contexts/LanguageContext';
import PageHeader from '../../components/common/PageHeader';

const TeacherForm = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('teachers.add')}
        subtitle={t('teachers.title')}
        backButton
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Teacher form implementation coming soon...
        </p>
      </div>
    </div>
  );
};

export default TeacherForm;