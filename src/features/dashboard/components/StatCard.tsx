import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  positive?: boolean;
};

const StatCard = ({ title, value, icon, change, positive = true }: StatCardProps) => {
  return (
    <div className="card p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-3 flex items-center">
          {positive ? (
            <ArrowUpRight size={16} className="text-green-500 mr-1" />
          ) : (
            <ArrowDownRight size={16} className="text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${positive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
            {change} <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;