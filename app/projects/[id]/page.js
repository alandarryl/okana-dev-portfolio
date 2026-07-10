"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; // On remonte de 3 dossiers pour trouver lib
import Link from "next/link";
import { useParams } from "next/navigation"; // Cet outil sert à attraper l'ID dans l'URL

const ProjectDetailPage = () => {
    const params = useParams(); // On récupère les paramètres de l'URL
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                // On demande à Supabase le projet où la colonne 'id' est ÉGALE à params.id
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .eq("id", params.id)
                    .single(); // .single() dit à Supabase : "Renvoie-moi 1 seul objet, pas un tableau"

                if (error) {
                    console.error("Error fetching project details:", error);
                } else {
                    setProject(data);
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProjectDetails();
        }
    }, [params.id]);

    if (loading) {
        return <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">Chargement du projet...</div>;
    }

    // Si on n'a pas trouvé de projet avec cet ID
    if (!project) {
        return (
            <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-4">
                <p className="text-red-500 font-semibold">Projet introuvable ou inexistant.</p>
                <Link href="/projets" className="text-blue-500 hover:underline">← Retour aux projets</Link>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center py-10">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
                
                {/* Bouton Retour */}
                <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block">
                    ← Retour à la liste
                </Link>

                {/* Image du projet en grand */}
                {project.image_url && (
                    <img 
                        src={project.image_url} 
                        alt={project.title || project.name} 
                        className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
                    />
                )}

                {/* Titre et description complète */}
                <h1 className="text-3xl font-bold mb-4 text-gray-900">{project.title || project.name}</h1>
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                    {project.description}
                </p>

                {/* Bouton pour tester le projet en vrai */}
                {project.link && (
                    <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Tester le projet 🌐
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;