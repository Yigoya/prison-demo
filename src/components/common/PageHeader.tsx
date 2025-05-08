import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backButton?: boolean;
  backUrl?: string;
};

const PageHeader = ({ 
  title, 
  subtitle, 
  children, 
  backButton = false,
  backUrl
}: PageHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          {backButton && (
            <button
              onClick={handleBack}
              className="mr-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
        
        {children && (
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;