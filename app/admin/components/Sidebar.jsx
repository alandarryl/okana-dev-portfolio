"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase"; // On importe supabase pour couper la session
import { useRouter } from "next/navigation";   // On importe le routeur pour rediriger

export default function Sidebar({ activeTab, setActiveTab }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. On demande à Supabase de fermer la session
      await supabase.auth.signOut();
      // 2. On renvoie proprement l'utilisateur vers le login
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between min-h-screen">
      {/* Partie Haute : Menu de navigation */}
      <div className="space-y-6">
        <div className="text-xl font-bold text-cyan-400">🔒 Zone Admin</div>
        <nav className="flex flex-col space-y-2">
          <button 
            onClick={() => setActiveTab("projects")}
            className={`text-left p-3 rounded transition ${activeTab === "projects" ? "bg-cyan-600 text-white" : "hover:bg-gray-700 text-gray-300"}`}
          >
            📁 Gérer les projets
          </button>
          
          <button 
            onClick={() => setActiveTab("messages")}
            className={`text-left p-3 rounded transition ${activeTab === "messages" ? "bg-cyan-600 text-white" : "hover:bg-gray-700 text-gray-300"}`}
          >
            ✉️ Voir les messages
          </button>
        </nav>
      </div>

      {/* Partie Basse : Bouton Déconnexion */}
      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left p-3 rounded text-red-400 hover:bg-red-500/10 hover:text-red-300 transition font-medium flex items-center gap-2"
        >
          🚪 Se déconnecter
        </button>
      </div>
    </aside>
  );
}