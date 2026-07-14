"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ name, email, message }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error.message);
      setErrorMsg("Une erreur est survenue lors de l'envoi. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#090d16] text-slate-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl grid gap-12 lg:grid-cols-[1fr_1.3fr] items-center">
        
        {/* Section Infos - Respire sur le fond sombre */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Me <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contacter</span>
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto lg:mx-0"></div>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
            Envoyez-moi un message via le formulaire, je vous répondrai dès que possible. Que ce soit pour un projet, une opportunité ou simplement échanger !
          </p>

          <div className="space-y-4 pt-4 text-sm font-light">
            <p className="text-slate-300">
              Email : <a href="mailto:jonathan.okana@example.com" className="text-cyan-400 hover:text-cyan-300 font-normal transition-colors">
                jonathan.okana@example.com
              </a>
            </p>
            <p className="text-slate-300">
              Téléphone : <a href="tel:+15551234567" className="text-cyan-400 hover:text-cyan-300 font-normal transition-colors">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>

        {/* Section Formulaire - Panneau asymétrique discret */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm w-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Messages de Statut (Succès / Erreur) */}
            {success && (
              <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl text-sm font-medium border border-emerald-500/20">
                Votre message a bien été envoyé ! Je vous répondrai au plus vite. 👍
              </div>
            )}

            {errorMsg && (
              <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl text-sm font-medium border border-rose-500/20">
                {errorMsg} ⚠️
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Adresse Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Votre Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="5" 
                className="w-full bg-slate-950/60 border border-white/5 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm resize-none"
                placeholder="Bonjour Jonathan, j'aimerais collaborer sur..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none text-sm tracking-wide"
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;