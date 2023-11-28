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
        <h3 className="text-lg font-bold mt-2">{course.title}</h3>
        <p className="text-gray-600">{course.description}</p>
    </Link>
  );
};

export default CourseBox;
