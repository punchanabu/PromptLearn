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
            <div className='flex justify-center items-center w-full h-full'>
                {loading == false ?
                <div className='space-y-2 mt-10'>
                    <CourseList courses={course}/>
                </div>  
                :  
                <Spinner/>  }
            </div>
        </Layout>
    )

}

export default Dashboard