import React from 'react'
import { useState, useEffect} from 'react'; 
import { mockLessonContent } from '../../public/mock/nav';
interface LessonContentProps {
    currentNavigation: string;
}

const LessonContent:React.FC<LessonContentProps> = ({currentNavigation}) => {
    
    const lessonId = currentNavigation;

    const [lessonContent, setLessonContent] = useState("");
    const [lessonTopic, setLessonTopic] = useState("");
    // try {
    //     const lessonData = fetch(`/api/courses/lesson?lessonId=${lessonId}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('usertoken')}`,
    //         },
    //     });
    //     setLessonContent(lessonData);
    // } catch(error) {
    //     console.error("Error getting lesson data:", error);
    // }

    useEffect(() => { 
        
        const fecthLessonContent = async () => {
            try {
                if (currentNavigation) {
                    
                    const response = await fetch(`/api/courses/lesson?lessonId=${lessonId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('usertoken')}`,
                        },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: `);
                }

                const data = await response.json();
                
                setLessonContent(data.content);
                setLessonTopic(data.title);

                }
            } catch(error) {
                console.error("Error getting lesson data:", error);
            }
        };
        fecthLessonContent();
    }, [currentNavigation]);

    return (
        <main className='w-3/4 pt-8 border-2 rounded-md p-5 bg-white'>
            <div className='text-2xl font-bold mb-2'>{lessonTopic}</div>
            <div className=''>{lessonContent}</div>
        </main>
    )

}

export default LessonContent