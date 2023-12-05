import React from 'react';
import Link from 'next/link';
import { FiBook, FiUser, FiCalendar } from 'react-icons/fi';

interface CourseData {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  owner: string;
}

const CourseBox = ({ course }: { course: CourseData }) => {
  const nDate = new Date(course.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <Link href={`courses/${course.id}`} className="course-box rounded-lg p-4 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer bg-gray-700 text-white flex flex-col justify-between">
        <h3 className="text-lg font-bold mt-2 flex items-center"><FiBook className="mr-2 text-red-400" />{course.title}</h3>
        <p className="text-white">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-white mt-4">
          <span><FiUser /> {course.owner}</span>
          <span><FiCalendar /> {nDate}</span>
        </div>
    </Link>
  );
};

export default CourseBox;
