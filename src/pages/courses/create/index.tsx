import React, { useState } from 'react';
import Layout from '../../../components/Layout';
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

    return (
        <Layout>
            <div className="flex justify-center items-center h-screen px-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"> {/* Added padding for smaller screens */}
                <form onSubmit={handleSubmit} className="w-full "> {/* Responsive width */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-center text-white mb-6">Create Your Course</h2>
                    {/* Course Name Field */}
                    <div className="mb-6">
                        <label className="block text-white text-md font-bold mb-2" htmlFor="courseName">
                            What do you want to learn?
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-white bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
                            id="courseName"
                            type="text"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            placeholder="ex: Go programming language for beginners"
                        />
                        <p className="mt-4 text-white text-sm text-center">
                            Note: Generating a course may take 2-3 minutes to fully complete.
                        </p>
                    </div>
                    {/* Submit Button */}
                    <button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                        type="submit"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default CreateCourseComponent;
