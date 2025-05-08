import { useLanguage } from '../../../contexts/LanguageContext';

type Activity = {
  id: string;
  user: string;
  action: string;
  time: string;
};

const ActivityLog = () => {
  const { t } = useLanguage();
  
  // Simulated activity data
  const activities: Activity[] = [
    {
      id: "1",
      user: "Admin User",
      action: "Registered new student: Abebe Kebede",
      time: "10 minutes ago"
    },
    {
      id: "2",
      user: "Teacher User",
      action: "Submitted grades for Computer Science 101",
      time: "30 minutes ago"
    },
    {
      id: "3",
      user: "Staff User",
      action: "Updated attendance records for Mathematics class",
      time: "1 hour ago"
    },
    {
      id: "4",
      user: "Admin User",
      action: "Added new course: Introduction to Law",
      time: "3 hours ago"
    },
    {
      id: "5",
      user: "Teacher User",
      action: "Created new exam for English Literature",
      time: "5 hours ago"
    },
    {
      id: "6",
      user: "Admin User",
      action: "Assigned Teacher Alemu to Economics course",
      time: "Yesterday"
    }
  ];

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {activities.map((activity) => (
        <div key={activity.id} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.user}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activity.action}
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;