"use client";
import { useState } from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-6 min-h-screen">
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
        </aside>
    );

}

