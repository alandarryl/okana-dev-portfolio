"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false }); // Les plus récents en premier

      if (!error) setMessages(data);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  if (loading) return <p>Chargement des messages...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Messages Reçus</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded shadow border border-gray-200">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span className="font-semibold text-gray-700">{msg.name} ({msg.email})</span>
                <span>{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-line">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}