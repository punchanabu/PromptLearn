import React from 'react'
import Layout from '@/components/Layout'
import CourseList from '@/components/CourseList'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
const dashboard = () => {

    const [course, setCourse] = useState([]);
    const router = useRouter();
    const getCourse = async () => {
        const token = localStorage.getItem('usertoken');
        if (!token) {
            // navigate to login page
            router.push('/login')
            return;
        }
        const course = await fetch('/api/courses/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        const courseJson = await course.json();
        
        setCourse(courseJson);
    }
    useEffect( () => {
        getCourse();
    },[]);

    return (
        <Layout>
            <div className='space-y-2 mt-10'>
                <h1 className='text-4xl font-bold text-center'>Your Courses</h1>       
                <h2 className='text-center'>This where your generated course are enjoy learning!</h2>
                <CourseList courses={course}/>
            </div>
        </Layout>
    )

}

export default dashboard