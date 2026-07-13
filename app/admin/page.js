"use client";
import { useState, useEffect } from "react"; 
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";

// Importations de tous tes sous-composants CRUD isolés
import ManageProjects from "./components/ManageProjects";
import ViewMessages from "./components/ViewMessages";
import ManageProfile from "./components/ManageProfile";
import ManageSkills from "./components/ManageSkills";
import ManageExperiences from "./components/ManageExperience";
import ManageEducation from "./components/ManageEducation";

// Dictionnaire qui fait correspondre chaque ID d'onglet à son composant
const TAB_COMPONENTS = {
  projects: <ManageProjects />,
  messages: <ViewMessages />,
  profile: (
    <div className="space-y-6">
      <ManageProfile />
      <ManageSkills />
    </div>
  ),
  parcours: (
    <div className="space-y-6">
      <ManageExperiences />
      <ManageEducation />
    </div>
  ),
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [estAutorise, setEstAutorise] = useState(false);
  const [chargement, setChargement] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verifierConnexion() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          router.push("/login");
        } else {
          setEstAutorise(true);
        }
      } catch (err) {
        console.error("Erreur de vérification auth:", err);
        router.push("/login");
      } finally {
        setChargement(false);
      }
    }
    verifierConnexion();
  }, [router]);

  if (chargement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 font-medium">
        Vérification de tes accès administrateur... 🔒
      </div>
    );
  }

  if (!estAutorise) return null;

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-10 text-gray-900 min-h-screen">
        {/* Affichage dynamique ultra propre sans aucune suite de "if" ou "&&" */}
        {TAB_COMPONENTS[activeTab] || <p>Onglet inconnu</p>}
      </main>
    </div>
  );
}