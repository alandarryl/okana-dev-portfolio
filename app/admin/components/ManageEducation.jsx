"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function ManageEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEdu, setNewEdu] = useState({ degree: "", school: "", duration: "" });

  useEffect(() => {
    async function fetchEducation() {
      const { data, error } = await supabase.from("education").select("*").order("created_at", { ascending: false });
      if (!error) setEducation(data);
      setLoading(false);
    }
    fetchEducation();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("education").insert([newEdu]).select();
      if (error) throw error;
      if (data) setEducation((prev) => [data[0], ...prev]);
      setNewEdu({ degree: "", school: "", duration: "" });
    } catch (err) { console.error(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce diplôme ?")) return;
    try {
      await supabase.from("education").delete().eq("id", id);
      setEducation((prev) => prev.filter((e) => e.id !== id));
    } catch (err) { console.error(err.message); }
  };

  if (loading) return <p className="text-gray-500">Chargement de l'éducation...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">🎓 Diplômes & Formations</h2>
      
      <form onSubmit={handleAdd} className="grid gap-3 md:grid-cols-4 items-end bg-gray-50 p-4 rounded-xl border">
        <div className="md:col-span-2">
          <input type="text" placeholder="Diplôme ou Certification" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} className="w-full border rounded-lg p-2 text-sm outline-none bg-white" required />
        </div>
        <div>
          <input type="text" placeholder="École / Organisme" value={newEdu.school} onChange={(e) => setNewEdu({...newEdu, school: e.target.value})} className="w-full border rounded-lg p-2 text-sm outline-none bg-white" required />
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Années" value={newEdu.duration} onChange={(e) => setNewEdu({...newEdu, duration: e.target.value})} className="w-full border rounded-lg p-2 text-sm outline-none bg-white" required />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition">Ajouter</button>
        </div>
      </form>

      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-xl flex justify-between items-center gap-4 hover:bg-gray-50/50 transition">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{edu.degree}</h3>
              <p className="text-xs text-gray-500">{edu.school} — <span className="text-gray-400">{edu.duration}</span></p>
            </div>
            <button onClick={() => handleDelete(edu.id)} className="text-xs text-red-500 bg-red-50 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}