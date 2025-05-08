import { Calendar } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'class' | 'meeting' | 'deadline';
};

const UpcomingEvents = () => {
  const { t } = useLanguage();
  
  // Simulated event data
  const events: Event[] = [
    {
      id: "1",
      title: "Mathematics Final Exam",
      date: "Sep 25, 2025",
      time: "10:00 AM",
      type: "exam"
    },
    {
      id: "2",
      title: "Computer Science Lab",
      date: "Sep 23, 2025",
      time: "2:00 PM",
      type: "class"
    },
    {
      id: "3",
      title: "Faculty Meeting",
      date: "Sep 22, 2025",
      time: "9:00 AM",
      type: "meeting"
    },
    {
      id: "4",
      title: "Project Submission Deadline",
      date: "Sep 30, 2025",
      time: "11:59 PM",
      type: "deadline"
    },
    {
      id: "5",
      title: "Literature Mid-term Exam",
      date: "Oct 5, 2025",
      time: "1:00 PM",
      type: "exam"
    }
  ];

  // Function to get badge styles based on event type
  const getBadgeStyles = (type: Event['type']) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'class':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'deadline':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {events.map((event) => (
        <div key={event.id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-dark/10 flex items-center justify-center mr-3">
              <Calendar size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {event.title}
              </p>
              <div className="flex mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
                  {event.date}, {event.time}
                </span>
                <span className={`text-xs inline-flex px-2 py-0.5 rounded ${getBadgeStyles(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;