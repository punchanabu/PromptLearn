import React from 'react';
import Link from 'next/link';
import { FiBook, FiUser, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import BookSvg from "../../public/assets/star.svg";
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
  });
  return (
    <Link href={`courses/${course.id}`} className='space-y-5 flex items-center flex-col justify-center shadow-xl p-10 rounded-xl transition-transform duration-300 hover:translate-y-3'>
        <div className="font-bold flex items-center space-x-5">
          <div className='p-5 shadow-md rounded-full bg-gray-200'>
            <Image src = {BookSvg} width={25} height={25} alt = "books"/>
          </div>
          <h2 className='text-2xl'>{course.title}</h2>
        </div>
        <p className="text-black">{course.description}</p>
        <div>
          <p>{nDate}</p>
        </div>
    </Link>
  );
};

export default CourseBox;
