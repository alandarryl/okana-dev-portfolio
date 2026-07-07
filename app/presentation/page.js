


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


    return(
        <div >
            <h1>{resume.name}</h1>
            <p>{resume.title}</p>
            <p>{resume.contact.email}</p>
            <p>{resume.contact.phone}</p>
            <p>{resume.contact.linkedin}</p>
            <p>{resume.contact.github}</p>
            <p>{resume.introduction}</p>
            <h2>Skills</h2>
            <ul>
                {resume.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    )

}


export default ResumePage;


