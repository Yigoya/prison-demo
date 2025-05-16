import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { useTheme } from '../../contexts/ThemeContext';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const { theme } = useTheme();

  // Log on component mount
  useEffect(() => {
    console.log('NotificationDropdown mounted with', mockNotifications.length, 'notifications');
    console.log('Unread count:', unreadCount);
    return () => {
      console.log('NotificationDropdown unmounted');
    };
  }, [unreadCount]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    console.log('Toggle dropdown, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
    // In a real app, you would update your state here
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 relative"
        onClick={toggleDropdown}
        aria-label="Notifications"
        type="button"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {mockNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                    !notification.read ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getNotificationColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{notification.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {mockNotifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="w-full px-4 py-2 text-sm text-center text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-white"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown; 