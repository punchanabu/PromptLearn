import React from 'react';

interface NavigationData {
    lessonId: string;
    topic: string;
}

type SetCurrentNavigation = (navigation: string) => void;

interface LessonNavigationProps {
    navigationData: NavigationData[];
    setCurrentNavigation: SetCurrentNavigation;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ navigationData, setCurrentNavigation }) => {
  return (
    <div className='flex flex-col w-1/4 border-2 rounded-md max-h-96'>
      <h1 className='text-center text-2xl font-sans font-bold p-5 bg-white/50 z-0'>Topics</h1>
      <div className="overflow-auto max-h-96"> {/* Adjust max-h value as needed */}
        {navigationData.map((navigation) => (
          <button
            key={navigation.lessonId}
            className='bg-white hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded block w-full'
            onClick={() => setCurrentNavigation(navigation.lessonId)}
          >
            {navigation.topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonNavigation;
