"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Charger les messages au démarrage
  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setMessages(data);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  // 2. Fonction pour supprimer un message
  const handleDelete = async (id) => {
    const confirmer = window.confirm("Es-tu sûr de vouloir supprimer ce message ?");
    if (!confirmer) return;

    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id); // Supprime la ligne où l'id correspond

      if (error) throw error;

      // Met à jour l'affichage en filtrant le message supprimé
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
      alert("Impossible de supprimer le message.");
    }
  };

  if (loading) return <p className="text-gray-600">Chargement des messages...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Messages Reçus</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-gray-700">{msg.name}</span>
                  <span className="text-gray-400">({msg.email})</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-line text-sm border border-gray-100">
                  {msg.message}
                </p>
              </div>

              {/* 🗑️ Bouton Supprimer */}
              <button
                onClick={() => handleDelete(msg.id)}
                className="self-end md:self-start px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition duration-200"
              >
                🗑️ Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}