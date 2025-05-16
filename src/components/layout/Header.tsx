import { Bell, Sun, Moon, Globe, Menu, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import logo from '../../assets/fpc-logo.png';
import { Link } from 'react-router-dom';
import NotificationDropdown from '../common/NotificationDropdown';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const toggleUserDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10 transition-colors duration-300">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left: Menu toggle and logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 md:hidden"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="flex items-center">
            <img src={logo} alt="FPC Logo" className="h-8 w-8 mr-2" />
            <span className="hidden md:inline-block font-semibold text-primary dark:text-white">
              {t('common.appName')}
            </span>
          </Link>
        </div>

        {/* Right: User actions */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={toggleLangDropdown}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Change language"
            >
              <Globe size={20} />
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
                <div className="py-1">
                  <button
                    onClick={() => { setLanguage('en'); toggleLangDropdown(); }}
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('am'); toggleLangDropdown(); }}
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'am' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    አማርኛ
                  </button>
                  <button
                    onClick={() => { setLanguage('or'); toggleLangDropdown(); }}
                    className={`w-full text-left px-4 py-2 text-sm ${language === 'or' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    Afaan Oromoo
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          {/* Notifications */}
          <NotificationDropdown />
          
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                ) : (
                  <User size={18} />
                )}
              </div>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('header.profile')}
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t('header.settings')}
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    {t('header.logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;