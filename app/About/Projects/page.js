
const projectsList = [
  {
    title: "Project 1",
    description: "Description of Project 1",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
  },
    {
    title: "Project 3",
    description: "Description of Project 3",
  },
];

const ProjectsPage = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>My Projects</h1>
        <ul>
            {projectsList.map((project, index) => (
                <li key={index}>
                    <h2>{project.title}</h2>
                    <a href={`/About/Projects/${index}`} className="text-blue-500 hover:underline">
                        View Details
                    </a>
                </li>
            ))}
        </ul>
        <a href="/About" className="text-blue-500 hover:underline">
            Back to about page
        </a>
    </div>
  );
}

export default ProjectsPage;
