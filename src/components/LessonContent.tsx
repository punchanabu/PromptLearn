import React from 'react'
import {useState} from 'react'; 
interface LessonContentProps {
    currentNavigation: string;
}
const LessonContent:React.FC<LessonContentProps> = ({currentNavigation}) => {
    
    const lessonId = currentNavigation;

    const [lessonContent, setLessonContent] = useState("");

    try {
        const lessonData = fetch('/api/courses/lesson', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('usertoken')}`,
            },
            body: JSON.stringify({ lessonId }),
        });
    } catch(error) {
        console.error("Error getting lesson data:", error);
    }
    
    return (
      <div>${lessonContent}</div>
    )

}

export default LessonContent