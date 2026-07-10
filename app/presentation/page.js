"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


const resume = {
  name: "Jonathan Okana",
  title: "Full Stack Developer",
  contact: {
    email: "jonathan.okana@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://www.linkedin.com/in/jonathanokana",
    github: "https://github.com/jonathanokana",
  },
  introduction: "Passionate full stack developer with experience in building web applications using modern technologies. Skilled in both frontend and backend development, with a strong focus on creating user-friendly interfaces and efficient server-side logic.",
  skills: [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "HTML5 & CSS3",
    "RESTful APIs",
    "Git & GitHub",
  ]
};


const ResumePage = () =>{
    const [resumeData, setResumeData] = useState(null);
    const [skillsData, setSkillsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchSkills = async () =>{
            try{
                const { data, error } = await supabase.from('skills').select('*');
                if(error){
                    console.error("Error fetching skills:", error);
                }else{
                    setSkillsData(data);
                }
            } catch(error){
                console.error("Error fetching skills:", error);
            } finally{
                setLoading(false);
            }
        }

        const fetchResume = async() =>{
            try{
                const { data, error } = await supabase.from('resume').select('*').maybeSingle();
                console.log("Resume fetch result:", { data, error });
                if(error){
                    console.error("Error fetching resume:", error.message || error);
                } else {
                    setResumeData(data);
                }
            } catch(error){
                console.error("Error fetching resume:", error);
            } finally{
                setLoading(false);
            }
        }

        fetchSkills();
        fetchResume();
    }, []);

    if(loading){
        return <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
    }



    return(
        <div >
            <h1>{resumeData?.name || resume.name}</h1>
            <p>{resumeData?.title || resume.title}</p>
            <p>{resumeData?.email || resume.contact.email}</p>
            <p>{resumeData?.phone || resume.contact.phone}</p>
            <p>{resumeData?.linkedin || resume.contact.linkedin}</p>
            <p>{resumeData?.github || resume.contact.github}</p>
            <p>{resumeData?.introduction || resume.introduction}</p>
            <h2>Skills</h2>
            <ul>
                {skillsData && skillsData.length > 0 ? (
                    skillsData.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                    ))
                ) : (
                    <li>No skills available.</li>
                )}
            </ul>
        </div>
    )

}


export default ResumePage;


