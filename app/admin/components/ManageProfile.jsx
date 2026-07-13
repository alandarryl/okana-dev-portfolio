"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "", title: "", email: "", phone: "", linkedin: "", github: "", introduction: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase.from("profile").select("*").maybeSingle();
      if (!error && data) setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from("profile").upsert([profile]);
      if (error) throw error;
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      console.error(err.message);
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Chargement du profil...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Mon Profil & Résumé</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nom Complet</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Titre Professionnel</label>
            <input type="text" value={profile.title} onChange={(e) => setProfile({...profile, title: e.target.value})} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" required />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Téléphone</label>
            <input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn URL</label>
            <input type="url" value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">GitHub URL</label>
            <input type="url" value={profile.github} onChange={(e) => setProfile({...profile, github: e.target.value})} className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Introduction / Bio</label>
          <textarea value={profile.introduction} onChange={(e) => setProfile({...profile, introduction: e.target.value})} rows="4" className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" required></textarea>
        </div>

        <button type="submit" disabled={saving} className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition disabled:bg-cyan-400">
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </form>
      {profile && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Aperçu du Profil</h3>
          <h2 className="text-lg font-bold text-gray-800">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.title}</p>
          <p className="text-sm text-gray-500">Email: {profile.email}</p>
            <p className="text-sm text-gray-500">Téléphone: {profile.phone}</p>
            <p className="text-sm text-gray-500">LinkedIn: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.linkedin}</a></p>
            <p className="text-sm text-gray-500">GitHub: <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.github}</a></p>
          <h4 className="font-semibold text-gray-700 mt-3 mb-1">Introduction</h4>
          <p className="text-gray-600">{profile.introduction}</p>
        </div>
      )}
    </div>
  );
}