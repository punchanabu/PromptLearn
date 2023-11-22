import React, { useEffect } from 'react'
import CourseBox from './CourseBox';
// declaring coursesData is an array of objects CourseData from CourseBox.tsx
interface CourseData {
    id: string;
    title: string;
    description: string;
    owner: string;
    createdAt: string;
    createdBy: string;
}

const CourseList = ({ courses }: { courses: CourseData[] }) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {courses.map((course) => (
        <CourseBox key={course.id} course={course} />
      ))}
    </div>
  )
}

export default CourseList;
