"use client";
import { useState } from "react";
import ManageProjects from "./components/ManageProjects";
import ViewMessages from "./components/ViewMessages";

import Sidebar from "./components/Sidebar";

export default function AdminDashboard() {
  // L'onglet actif ("projects" par défaut)
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      
      {/* 🧭 SIDEBAR DE L'ADMIN */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 💻 ZONE DE CONTENU DYNAMIQUE */}
      <main className="flex-1 p-10 text-gray-900 min-h-screen">
        {activeTab === "projects" && <ManageProjects />}
        {activeTab === "messages" && <ViewMessages />}
      </main>

    </div>
  );
}