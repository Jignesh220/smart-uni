'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div className='min-h-screen min-w-full flex justify-center items-center flex-col'>
      <div className='text-3xl font-capriola'>Something went wrong!</div>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='bg-blue-500 mt-4 p-2 px-6 rounded-3xl font-capriola text-white shadow-md shadow-slate-400'
      >
        Try again
      </button>
    </div>
  );
}
