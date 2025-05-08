import { Loader2 } from 'lucide-react';
import logo from '../../assets/fpc-logo.png';
import { useLanguage } from '../../contexts/LanguageContext';

const LoadingScreen = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center">
        <img src={logo} alt="FPC Logo" className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">
          {t('common.appName')}
        </h1>
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-primary mr-2" />
          <p className="text-gray-600 dark:text-gray-300">{t('common.loading')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;