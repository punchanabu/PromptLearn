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
    <div className='flex flex-col w-1/4'>
      {navigationData.map((navigation) => (
        <button
          key={navigation.lessonId}
          className='p-2 m-2 border-2 border-gray-400 rounded-md'
          onClick={() => setCurrentNavigation(navigation.lessonId)}
        >
          {navigation.topic}
        </button>
      ))}
    </div>
  );
};

export default LessonNavigation;
