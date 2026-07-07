
import React from "react";

const Project = async ({params}) => {
  const { id } = await params;
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
    const project = projectsList[id];

    if (!project) {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1>Project Not Found</h1>
        </div>
    );
    }

    return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <a href="/About/Projects" className="text-blue-500 hover:underline">
            Back to Projects
        </a>
    </div>
    );
}

export default Project;
