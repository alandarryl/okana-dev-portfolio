"use client";
import { supabase } from "../../../lib/supabase"; 
import { useRouter } from "next/navigation";   

// Configuration des onglets accessible à la modification
const NAVIGATION_TABS = [
  { id: "projects", label: "Gérer les projets", icon: "📁" },
  { id: "messages", label: "Voir les messages", icon: "✉️" },
  { id: "profile", label: "Mon Profil", icon: "👤" },
  { id: "parcours", label: "Mon Parcours", icon: "🎓" },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between min-h-screen">
      {/* Menu de navigation dynamique */}
      <div className="space-y-6">
        <div className="text-xl font-bold text-cyan-400">🔒 Zone Admin</div>
        <nav className="flex flex-col space-y-2">
          {NAVIGATION_TABS.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left p-3 rounded transition flex items-center gap-2 ${
                activeTab === tab.id 
                  ? "bg-cyan-600 text-white" 
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Partie Basse : Déconnexion */}
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