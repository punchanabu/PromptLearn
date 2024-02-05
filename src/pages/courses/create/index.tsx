import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import CreateSvg from "../../../../public/assets/create.svg";
import UserSvg from "../../../../public/assets/user.svg";
import StarSvg from "../../../../public/assets/star.svg";

import Image from 'next/image';
const CreateCourseComponent: React.FC = () => {
    const [courseName, setCourseName] = useState('');

    const handleCourseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Add logic to handle course creation
        try {

            const response = await fetch('/api/courses/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('usertoken')}`,
                },
                body: JSON.stringify({ courseName }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

        } catch (error) {
            if (error instanceof Error)  {
              console.error("Error creating course:", error.message);
            }
            console.error("Error creating course:", error);
        }
        
    };
    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        if (!token) {
            window.location.href = '/login';
        }
    });
    return (
        <Layout>
            <div className="flex flex-col md:grid md:grid-cols-2 p-10">
                <div className='p-10 space-y-12 '>
                    <div className='flex justify-center items-center flex-col shadow-md rounded-md p-10 max-w-xl space-y-2'>
                        <Image src={CreateSvg} alt="Create your notes" width={90} height={90}/> 
                        <h3 className='text-3xl font-bold mt-5 text-center'>Just Start typing what you want to learn!</h3>
                        <p>Our AI will generated the notes and the topics required for you</p>
                    </div>
                    <div className='flex justify-center items-center flex-col shadow-md rounded-md p-10 max-w-xl space-y-2'>
                        <Image src={UserSvg} alt="Create your notes" width={90} height={90}/> 
                        <h3 className='text-3xl font-bold mt-5 text-center'>We will generated customized Course for you</h3>
                        <p className='text-center'>Course will be specific by each user to ensure that you will get the personalized courses</p>
                    </div>
                </div>
                <div className='p-10 space-y-10 flex flex-col items-center justify-center shadow-md rounded-md h-full'>
                    <Image src={StarSvg} alt="Create your notes" width={90} height={90}/>
                    <h1 className='text-center text-5xl font-bold'>Start Creating!</h1>
                    <p className='text-center text-xl'>Now let's start your learning Journey and create a New Courses!</p>
                    <form className='space-y-10 flex items-center justify-center flex-col w-full'>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Course Name"
                            value={courseName}
                            onChange={handleCourseNameChange}
                        />
                        <button 
                            type="submit"
                            className="bg-black text-white p-5 rounded-xl text-xl"
                            onClick={handleSubmit}
                        >
                            Create Course
                        </button>
                    </form>
                </div>
               

            </div>
        </Layout>
    );
}

export default CreateCourseComponent;
