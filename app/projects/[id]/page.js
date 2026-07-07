


const ProjectPage = ({ params }) => {
  const { id } = params;
    return (
        <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-4 ">
            <h1 className="text-3xl font-bold mb-4">{projects[id].name}</h1>
            <p className="mb-2">{projects[id].description}</p>
            <p className="mb-2">Technologies Used: {projects[id].technologies.join(", ")}</p>
        </div>
    );
}

export default ProjectPage;

