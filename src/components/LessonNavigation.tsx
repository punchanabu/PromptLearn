import React from 'react';

interface NavigationData {
    lessonId: string;
    topic: string;
}

type SetCurrentNavigation = (navigation: string) => void;

interface LessonNavigationProps {
    navigationData: NavigationData[];
    setCurrentNavigation: SetCurrentNavigation;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ navigationData, setCurrentNavigation, setLoading }) => {
  const setNavigation = (navigation: string) => {
    setCurrentNavigation(navigation);
    setLoading(true);
  }
  return (
    <div className='flex flex-col w-full md:w-1/4 shadow-md shadow-gray-800 rounded-lg max-h-96 bg-gray-800'>
      <h1 className='text-center text-2xl font-sans font-bold p-5 text-gray-200 rounded-md bg-gray-900'>Lessons</h1>
      <div className="overflow-auto max-h-96">
        {navigationData.map((navigation) => (
          <button
            key={navigation.lessonId}
            className='text-gray-200 hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded block w-full'
            onClick={() => setNavigation(navigation.lessonId)}
          >
            {navigation.topic}
          </button>
        ))}
      </div>
    </div>
  );
};


export default LessonNavigation;
