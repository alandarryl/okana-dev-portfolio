"use client";
// 🚨 CORRECTION : On rajoute bien useEffect ici !
import { useState, useEffect } from "react"; 
import ManageProjects from "./components/ManageProjects";
import ViewMessages from "./components/ViewMessages";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";

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
        {activeTab === "projects" && <ManageProjects />}
        {activeTab === "messages" && <ViewMessages />}
      </main>
    </div>
  );
}