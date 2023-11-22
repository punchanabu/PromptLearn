import React from 'react';
import Link from 'next/link';

interface CourseData {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  owner: string;
}

const CourseBox = ({ course }: { course: CourseData }) => {
  return (
    <Link href={`courses/${course.id}`} className="course-box border rounded-lg p-4 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer">
        <img src='https://i.pinimg.com/originals/8d/9f/09/8d9f095f1c59bba933ce67c7cf7fe508.jpg' alt={course.title} className="w-full h-40 object-cover rounded" />
        <h3 className="text-lg font-bold mt-2">{course.title}</h3>
        <p className="text-gray-600">{course.description}</p>
    </Link>
  );
};

export default CourseBox;
