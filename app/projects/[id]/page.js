"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectDetailPage = () => {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", params.id)
          .single();

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
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col items-center justify-center space-y-4">
        <p className="text-rose-400 font-medium">Projet introuvable ou inexistant.</p>
        <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Retour aux projets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Bouton Retour minimaliste */}
        <Link 
          href="/projects" 
          className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Retour aux projets
        </Link>

        {/* En-tête : Titre issu de Supabase */}
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {project.title || project.name}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
        </header>

        {/* Image principale du projet */}
        {project.image_url && (
          <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-white/5 bg-slate-950 shadow-2xl">
            <img 
              src={project.image_url} 
              alt={project.title || project.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Layout en colonnes propre et adaptatif */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
          
          {/* Colonne principale : Description */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 tracking-widest uppercase">À propos du projet</h2>
            <p className="text-slate-300 leading-relaxed text-base whitespace-pre-line font-light">
              {project.description}
            </p>
          </div>

          {/* Colonne latérale : Uniquement le bouton si le lien existe */}
          <div className="space-y-6">
            {project.link && (
              <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5"
                >
                  Visiter le site en ligne 🌐
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetailPage;