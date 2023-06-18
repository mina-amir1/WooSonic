import { useState, useEffect } from 'react';

const NoInternetConnection = () => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
    };

    const handleOffline = () => {
      setOnline(false);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
    };
  }, []);

  if (isOnline) {
    return null;
  } else {
    return <p className='flex items-center justify-center h-10 px-4 text-sm font-medium text-red-900 bg-red-200 sm:px-6 lg:px-8'>No Internet Connection. Please try again later.</p>;
  }
};

export default NoInternetConnection;