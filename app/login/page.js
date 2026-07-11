"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Message 1 : On vérifie si le bouton réagit au clic
    console.log("1. Le bouton fonctionne, tentative lancée.");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Message 2 : On regarde ce que Supabase nous répond
      console.log("2. Réponse de Supabase :", { data, error });

      if (error) {
        setErrorMsg("Identifiants incorrects... ❌");
        setLoading(false);
      } else {
        // Message 3 : Tout est bon, on lance la redirection
        console.log("3. Connexion OK ! Redirection vers /admin...");
        router.push("/admin");
      }
    } catch (catchedError) {
      console.error("Erreur critique :", catchedError);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">Connexion Admin 🔒</h1>
        
        {errorMsg && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm font-medium">{errorMsg}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-300">Adresse Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full p-2.5 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-cyan-400 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-slate-300">Mot de passe</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full p-2.5 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-cyan-400 text-white"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 text-slate-950 font-bold py-2.5 rounded transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}