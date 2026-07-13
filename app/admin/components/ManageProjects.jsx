"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase"; 
import EditProjectModal from "./EditProjectModal";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectToEdit, setProjectToEdit] = useState(null); // Gère le projet ouvert dans la pop-up

  // État du formulaire d'ajout
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image_url: "",
    link: "",
  });

  // 1. Charger les projets existants
  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // 2. Ajouter un nouveau projet
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([newProject])
        .select(); // .select() permet de récupérer l'objet créé avec son nouvel ID Supabase

      if (error) throw error;

      // Ajout immédiat dans l'état local pour éviter de recharger la page
      if (data) setProjects((prev) => [data[0], ...prev]);
      setNewProject({ title: "", description: "", image_url: "", link: "" }); // Reset formulaire
    } catch (err) {
      console.error("Erreur ajout projet:", err.message);
      alert("Impossible d'ajouter le projet.");
    }
  };

  // 3. Supprimer un projet
  const handleDeleteProject = async (id) => {
    const confirmer = window.confirm("Supprimer définitivement ce projet ?");
    if (!confirmer) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err.message);
      alert("Erreur lors de la suppression.");
    }
  };

  // 4. Mettre à jour un projet (Appelé par la pop-up)
  const handleUpdateProject = async (id, updatedFields) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update(updatedFields)
        .eq("id", id);

      if (error) throw error;

      // Met à jour l'affichage localement
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
      );
      setProjectToEdit(null); // Ferme la pop-up
    } catch (err) {
      console.error("Erreur modification:", err.message);
      alert("Erreur lors de la modification.");
    }
  };

  if (loading) return <p className="text-gray-600">Chargement des projets...</p>;

  return (
    <div className="space-y-10">
      {/* ➕ FORMULAIRE D'AJOUT */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Ajouter un nouveau projet</h2>
        <form onSubmit={handleAddProject} className="grid gap-4 md:grid-cols-3 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={newProject.image_url}
              onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien URL</label>
              <input
                type="url"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition h-[40px]"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>

      {/* 📁 LISTE DES PROJETS */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Projets en ligne ({projects.length})</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-2xl border text-center">Aucun projet trouvé. Ajoute ton premier projet au-dessus !</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
                <div>
                  {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-3" />
                  )}
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-600 hover:underline block mb-4 break-all">
                      🔗 {project.link}
                    </a>
                  )}
                </div>

                {/* Boutons d'actions */}
                <div className="flex gap-2 border-t pt-3 mt-2">
                  <button
                    onClick={() => setProjectToEdit(project)}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-1.5 rounded-lg text-xs transition"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1.5 px-3 rounded-lg text-xs transition"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🪟 POP-UP DE MODIFICATION CONTEXTUELLE */}
      {projectToEdit && (
        <EditProjectModal
          project={projectToEdit}
          onClose={() => setProjectToEdit(null)}
          onUpdate={handleUpdateProject}
        />
      )}
    </div>
  );
}