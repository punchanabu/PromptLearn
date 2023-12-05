import {useRouter} from 'next/router';
import Layout from '@/components/Layout';
import {useState, useEffect} from 'react';
import LessonNavigation from '@/components/LessonNavigation';
import LessonContent from '@/components/LessonContent';
import { mockNavigationData } from '../../../public/mock/nav';

interface NavigationData {
    lessonId: string;
    topic: string;
}
/*

flow of the page 
1. get the courseId from the url
2. fetch the navigation data from the database from courseId
3. render the navigation data
4. when the user clicks on a navigation item, the currentNavigation state is updated
5. the currentNavigation state is passed to the LessonContent component
6. the LessonContent component fetches the content from the database using the currentNavigation state
7. the LessonContent component renders the content

*/
const Lesson = () => {

    const router = useRouter();

    // basically lesson == courseId
    const {courseId} = router.query;
    const [currentNavigation, setCurrentNavigation] = useState("");
    const [navigationData, setNavigationData] = useState<NavigationData[]>([]);

    // fetch the navigation data from the database from courseId
    useEffect(() => {
        const getNavigationData = async () => {
            const token = localStorage.getItem('usertoken');
            const response = await fetch(`/api/courses/getLessonId?courseId=${courseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setNavigationData(data);
        }
        getNavigationData();
    });
    return (
        <Layout>
            {/* <h1 className=''>courseId: {courseId }</h1>
            <h1 className=''>currentNavigation: {currentNavigation}</h1> */}
            <div className='flex space-x-5 w-full max-w-5xl'>
                <LessonNavigation navigationData = {navigationData} setCurrentNavigation = {setCurrentNavigation}/>
                
                <LessonContent currentNavigation = {currentNavigation} />
            </div>
        </Layout>
    );
};

export default Lesson; 