"use client";

import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ProjectsPage = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) {
          console.error("Error fetching projects:", error);
        } else {
          setProjectsData(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* En-tête de la page */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Mes <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projets</span>
          </h1>
          <p className="text-slate-400 max-w-xl">
            Découvrez une sélection d'applications web et d'outils que j'ai conçus, développés et déployés.
          </p>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="group bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              
              {/* Conteneur de l'image */}
              <div className="relative w-full h-48 bg-slate-950 overflow-hidden">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={`Illustration de ${project.title || project.name}`} 
                    // ❌ Supprime l'attribut fill ici
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900/50">
                    📂 Pas d'aperçu disponible
                  </div>
                )}
              </div>

              {/* Contenu textuel */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title || project.name}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-auto">
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors flex items-center gap-1"
                  >
                    En savoir plus <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg border border-white/5 transition-all"
                    >
                      Visiter 🌐
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectsPage;