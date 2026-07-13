"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function ManageExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newExp, setNewExp] = useState({ role: "", company: "", description: "", duration: "" });

  useEffect(() => {
    async function fetchExperiences() {
      const { data, error } = await supabase.from("experiences").select("*").order("created_at", { ascending: false });
      if (!error) setExperiences(data);
      setLoading(false);
    }
    fetchExperiences();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("experiences").insert([newExp]).select();
      if (error) throw error;
      if (data) setExperiences((prev) => [data[0], ...prev]);
      setNewExp({ role: "", company: "", description: "", duration: "" });
    } catch (err) { console.error(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette expérience ?")) return;
    try {
      await supabase.from("experiences").delete().eq("id", id);
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch (err) { console.error(err.message); }
  };

  if (loading) return <p className="text-gray-500">Chargement des expériences...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">💼 Expériences Professionnelles</h2>
      
      <form onSubmit={handleAdd} className="space-y-3 bg-gray-50 p-4 rounded-xl border">
        <div className="grid gap-3 md:grid-cols-3">
          <input type="text" placeholder="Rôle (ex: Développeur Fullstack)" value={newExp.role} onChange={(e) => setNewExp({...newExp, role: e.target.value})} className="border rounded-lg p-2 text-sm outline-none bg-white" required />
          <input type="text" placeholder="Entreprise" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} className="border rounded-lg p-2 text-sm outline-none bg-white" required />
          <input type="text" placeholder="Durée (ex: Janv 2025 - Juin 2025)" value={newExp.duration} onChange={(e) => setNewExp({...newExp, duration: e.target.value})} className="border rounded-lg p-2 text-sm outline-none bg-white" required />
        </div>
        <textarea placeholder="Description des missions..." value={newExp.description} onChange={(e) => setNewExp({...newExp, description: e.target.value})} rows="2" className="w-full border rounded-lg p-2 text-sm outline-none bg-white" required></textarea>
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-1.5 px-4 rounded-lg text-sm transition">Ajouter l'expérience</button>
      </form>

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-xl flex justify-between items-start gap-4 hover:bg-gray-50/50 transition">
            <div>
              <h3 className="font-bold text-gray-800 text-base">{exp.role} <span className="text-cyan-600 font-medium">@ {exp.company}</span></h3>
              <p className="text-xs text-gray-400 font-medium mb-1">{exp.duration}</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
            </div>
            <button onClick={() => handleDelete(exp.id)} className="text-xs text-red-500 bg-red-50 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}