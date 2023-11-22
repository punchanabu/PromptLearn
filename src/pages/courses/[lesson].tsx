import {useRouter} from 'next/router';
import Layout from '@/components/Layout';
import {useState} from 'react';
import LessonNavigation from '@/components/LessonNavigation';
import LessonContent from '@/components/LessonContent';
interface NavigationData {
    lessonId: string;
    topic: string;
}

const Lesson = () => {
    const router = useRouter();
    // basically lesson == courseId
    const {lesson} = router.query;
    const [currentNavigation, setCurrentNavigation] = useState("");
    const [navigationData, setNavigationData] = useState([]);
    
    return (
        <Layout>
            <h1>courseId: {lesson}</h1>
            <div className='flex'>
                <LessonNavigation navigationData = {navigationData} setCurrentNavigation = {setCurrentNavigation}/>
                <LessonContent currentNavigation = {currentNavigation} />
            </div>
        </Layout>
    );
};

export default Lesson; 