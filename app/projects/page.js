"use client";

import {supabase }from '../../lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const ProjectsPage = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () =>{
            try{
                const { data, error } = await supabase.from('projects').select('*');
                if(error){
                    console.error("Error fetching projects:", error);
                } else {
                    setProjectsData(data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if(loading){
        return <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold mb-4">My Projects</h1>
        {/* Changement ici : on passe sur une grille pour que ce soit plus joli avec des images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {projectsData.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col">
                    
                    {/* 📸 ICI ON RAJOUTE L'IMAGE */}
                    {project.image_url && (
                        <img 
                            src={project.image_url} 
                            alt={`Illustration de ${project.title || project.name}`} 
                            className="w-full h-48 object-cover" // h-48 fixe la hauteur, object-cover évite que l'image soit déformée
                        />
                    )}

                    {/* Contenu textuel */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            {/* Ajuste ici entre project.title ou project.name selon ton Supabase */}
                            <h2 className="text-xl font-semibold mb-2">{project.title || project.name}</h2>
                            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                            {/* Lien vers la page détail (dossier [id]) */}
                            <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline text-sm font-medium">
                                En savoir plus →
                            </Link>

                            {/* Lien vers le site en ligne */}
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 text-sm">
                                View Project 🌐
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default ProjectsPage;

