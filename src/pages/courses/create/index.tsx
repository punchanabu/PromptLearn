import React, { useState } from 'react';
import Layout from '@/components/Layout';
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
            <div className="flex justify-center items-center h-screen w-screen">
                <form onSubmit={handleSubmit} className="w-1/2 bg-white p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Course</h2>
                    {/* Course Name Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseName">
                            What do you want to learn?
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            id="courseName"
                            type="text"
                            value={courseName}
                            onChange={handleCourseNameChange}
                            placeholder="Enter topics you want to learn about"
                        />
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
