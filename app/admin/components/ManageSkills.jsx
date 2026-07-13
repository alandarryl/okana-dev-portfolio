"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", category: "Frontend" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase.from("skills").select("*").order("category");
      if (!error) setSkills(data);
      setLoading(false);
    }
    fetchSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;

    try {
      const { data, error } = await supabase.from("skills").insert([newSkill]).select();
      if (error) throw error;
      if (data) setSkills((prev) => [...prev, data[0]]);
      setNewSkill({ name: "", category: newSkill.category }); // Garde la catégorie sélectionnée
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p className="text-gray-500">Chargement des compétences...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Mes Compétences (Skills)</h2>
      
      {/* Formulaire d'ajout rapide */}
      <form onSubmit={handleAddSkill} className="flex flex-wrap gap-3 items-end bg-gray-50 p-4 rounded-xl border">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Nom du Skill</label>
          <input type="text" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} placeholder="React, Docker..." className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" required />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Catégorie</label>
          <select value={newSkill.category} onChange={(e) => setNewSkill({...newSkill, category: e.target.value})} className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
            <option value="CMS">CMS</option>
            <option value="Outils">Outils</option>
          </select>
        </div>
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition">Ajouter</button>
      </form>

      {/* Liste des compétences */}
      <div className="grid gap-4 sm:grid-cols-2">
        {["Frontend", "Backend", "DevOps", "CMS", "Outils"].map((cat) => {
          const filtered = skills.filter((s) => s.category === cat);
          if (filtered.length === 0) return null;
          return (
            <div key={cat} className="border rounded-xl p-4 bg-gray-50/50">
              <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-2">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {filtered.map((skill) => (
                  <span key={skill.id} className="inline-flex items-center gap-1 bg-white border text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                    {skill.name}
                    <button onClick={() => handleDeleteSkill(skill.id)} className="text-red-400 hover:text-red-600 font-bold ml-1">✕</button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}