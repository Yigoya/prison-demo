import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t('errors.pageNotFound')}
        </h2>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          {t('errors.pageNotFoundDescription')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            {t('errors.goBack')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary flex items-center"
          >
            <Home size={16} className="mr-2" />
            {t('errors.goHome')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;