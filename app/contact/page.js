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

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // 🚀 Envoi direct dans la table "messages" de Supabase
      const { error } = await supabase
        .from("messages")
        .insert([{ name, email, message }]);

      if (error) throw error;

      // Si tout s'est bien passé
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Vide le formulaire
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error.message);
      alert("Une erreur est survenue lors de l'envoi. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
          <p className="mb-3">Email: <a href="mailto:jonathan.okana@example.com" className="text-blue-500 hover:underline">
              jonathan.okana@example.com
          </a></p>
          <p className="mb-3">Phone: <a href="tel:+15551234567" className="text-blue-500 hover:underline">
              +1 (555) 123-4567
          </a></p>
          <p className="text-sm text-gray-600 mt-4">Envoyez-moi un message via le formulaire, je vous répondrai dès que possible.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ✨ Alerte de succès */}
            {success && (
              <p className="bg-green-100 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-200">
                Votre message a bien été envoyé ! Je vous répondrai au plus vite. 👍
              </p>
            )}

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-blue-300"
            >
              {loading ? "Envoi en cours..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;