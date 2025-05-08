import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 px-4 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p>
          &copy; {currentYear} {t('footer.copyright')}
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-primary dark:hover:text-white transition-colors">
            {t('footer.privacyPolicy')}
          </a>
          <a href="#" className="hover:text-primary dark:hover:text-white transition-colors">
            {t('footer.termsOfService')}
          </a>
          <a href="#" className="hover:text-primary dark:hover:text-white transition-colors">
            {t('footer.help')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;