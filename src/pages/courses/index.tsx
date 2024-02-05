import React from 'react'
import Layout from '../../components/Layout'
import CourseList from '../../components/CourseList'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Spinner from '@/components/Spinner'
const Dashboard = () => {

    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
        setCourse(courseJson);
    }
    useEffect( () => {
        getCourse();
    },[]);

    return (
        <Layout>
            <div className='flex flex-col space-y-5 items-center justify-center'>
                <h1 className='text-5xl font-bold'>Explore your Course Now</h1>
                <p>There is no limitation for learning any one can access to learning resources</p>
            </div>
            <div className='flex justify-center items-center w-full h-full'>
                {loading == false ?
                <div className='space-y-2 mt-10'>
                    <CourseList courses={course}/>
                </div>  
                :  
                <div className='w-screen h-[250px] flex justify-center items-center'>
                    <Spinner/>
                </div>  }
            </div>
        </Layout>
    )

}

export default Dashboard