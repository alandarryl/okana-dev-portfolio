
"use client";

import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();


    //recupere les valeurs du formulaire
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    if(!name || !email || !message){
      alert("Please fill in all fields.");
      return;
    }

    console.log("Form data:", { name, email, message });

    // Réinitialiser le formulaire après l'envoi
    e.target.reset();

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
            <div className="mb-4 ">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 " />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

