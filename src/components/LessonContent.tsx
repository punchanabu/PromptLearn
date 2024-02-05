import React, { useState, useEffect } from 'react'; 
import createMarkUp from '../helper/createMarkUp';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; 
import Spinner from './Spinner';

interface LessonContentProps {
    currentNavigation: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LessonContent: React.FC<LessonContentProps> = ({currentNavigation, loading, setLoading}) => {
    const lessonId = currentNavigation;
    const [lessonContent, setLessonContent] = useState("");
    const [lessonTopic, setLessonTopic] = useState("");

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
                        throw new Error(`Error ${response.status}`);
                    }
                    
                    const data = await response.json();
                    setLoading(false);
                    setLessonContent(data.content);
                    setLessonTopic(data.title);
                }
            } catch(error) {
                console.error("Error getting lesson data:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchLessonContent();
    }, [currentNavigation]);

    useEffect(() => {
        hljs.highlightAll();
    }, [lessonContent,lessonId]);

    return (
        <main className = {`lesson-content ${loading ? 'flex justify-center items-center' : ''} bg-white text-black p-5 rounded-lg shadow-lg mx-4 my-8 w-full md:w-3/4 `}>
            {loading ? <Spinner/> : 
                <>
                    <h1 className="text-3xl font-bold mb-4">{lessonTopic}</h1>
                    <article className="content overflow-auto" dangerouslySetInnerHTML={createMarkUp(lessonContent)} />
                </>
            }
        </main>
    );
}

export default LessonContent;
