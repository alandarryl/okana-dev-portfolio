"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ManageProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    const { error } = await supabase.from("projects").insert([
      { title, description, image_url: imageUrl, link }
    ]);

    if (error) {
      setStatus(`Erreur : ${error.message}`);
    } else {
      setStatus("Projet ajouté avec succès ! 🎉");
      setTitle(""); setDescription(""); setImageUrl(""); setLink("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter un Projet</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre du projet</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1 block w-full p-2 border rounded" rows="3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lien de l'image (URL)</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lien du site (URL)</label>
          <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
          Sauvegarder le projet
        </button>
        {status && <p className="text-sm mt-2 text-blue-600 font-medium">{status}</p>}
      </form>
    </div>
  );
}