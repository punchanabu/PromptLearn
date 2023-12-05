import React, { useState, useEffect } from 'react'; 
import Prism from 'prismjs';
import Script from 'next/script';
import createMarkUp from '@/helper/createMarkUp';
import { loadPrismLanguage, supportedLanguages } from '@/helper/PrismLanguage';
interface LessonContentProps {
    currentNavigation: string;
}

const LessonContent: React.FC<LessonContentProps> = ({currentNavigation}) => {
    const lessonId = currentNavigation;
    const [lessonContent, setLessonContent] = useState("");
    const [lessonTopic, setLessonTopic] = useState("");
    console.log(lessonContent);
    useEffect(() => { 
        const fetchLessonContent = async () => {
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
        fetchLessonContent();
    }, [currentNavigation]);

    useEffect(() => {
        
        supportedLanguages.forEach(async (language) => {
            if (lessonTopic.toLowerCase().includes(language)) {
                await loadPrismLanguage(language);
            }
        });
            
        Prism.highlightAll();
    }, [lessonContent]);

    return (
        <>
            <Script src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/prism.js" strategy='beforeInteractive'/>
            <main className='w-3/4 pt-8 border-2 rounded-md p-5 bg-white'>
                <div className='text-2xl font-bold mb-2'>{lessonTopic}</div>
                <div className='content' dangerouslySetInnerHTML={createMarkUp(lessonContent)}></div>
            </main>
        </>
    );
}

export default LessonContent;
