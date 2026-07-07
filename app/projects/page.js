

const projects = {
    learning_website:{
        name: "Learning Website",
        description: "A responsive website for online learning with interactive courses and quizzes.",
        technologies: ["React.js", "Node.js", "MongoDB"]
    },
    portfolio_website:{
        name: "Portfolio Website",
        description: "A personal portfolio website showcasing projects and skills.",
        technologies: ["Next.js", "Tailwind CSS"]
    },
    e_commerce_platform:{
        name: "E-commerce Platform",
        description: "A full-featured e-commerce platform with shopping cart and payment integration.",
        technologies: ["React.js", "Express.js", "Stripe API"]
    },
    social_media_app:{
        name: "Social Media App",
        description: "A social media application with user authentication and real-time chat.",
        technologies: ["React.js", "Firebase", "Socket.io"]
    },
    task_management_tool:{
        name: "Task Management Tool",
        description: "A web application for managing tasks and projects with team collaboration features.",
        technologies: ["Vue.js", "Node.js", "PostgreSQL"]
    },
    blog_platform:{
        name: "Blog Platform",
        description: "A blogging platform with content management and user engagement features.",
        technologies: ["Next.js", "GraphQL", "MongoDB"]
    },
    pokedex_app:{
        name: "Pokedex App",
        description: "A Pokedex application that allows users to search and view information about Pokemon.",
        technologies: ["React.js", "PokeAPI"]
    },
    deep_working_app:{
        name: "Deep Working App",
        description: "An application that helps users focus and manage their deep work sessions.",
        technologies: ["React.js", "Node.js", "MongoDB"]
    },
    writing_app:{
        name: "Writing App",
        description: "A web application for writers to create, edit, and organize their writing projects.",
        technologies: ["React.js", "Express.js", "MongoDB"]
    },
    student_marketplace:{
        name: "Student Marketplace",
        description: "A marketplace platform for students to buy and sell items and services.",
        technologies: ["React.js", "Node.js", "MongoDB"]
    }
};

const ProjectsPage = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold mb-4">My Projects</h1>
            <ul className="space-y-4">
                {Object.entries(projects).map(([key, project]) => (
                    <li key={key} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{project.name}</h2>
                        <p className="text-gray-600">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsPage;

export const metadata = {
    title: "Projects Page - Jonathan Okana Portfolio",
    description: "Explore my projects and the technologies I've used to build them.",
    keywords: ["Jonathan Okana", "portfolio", "projects", "technologies"],
};
