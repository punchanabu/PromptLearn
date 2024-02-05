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
    <div className='flex flex-col w-full md:w-1/4 shadow-md rounded-lg max-h-96 bg-white'>
      <h1 className='text-center text-2xl font-sans font-bold p-5 text-black rounded-md bg-white'>Lessons</h1>
      <div className="overflow-auto max-h-96">
        {navigationData.map((navigation) => (
          <button
            key={navigation.lessonId}
            className='text-black hover:text-gray-300 hover:bg-gray-700 py-2 px-4 rounded block w-full'
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
