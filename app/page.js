import Image from "next/image";

export default function Home() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-extrabold mb-4">Salut, moi c'est [Ton Prénom] 👋</h1>
      <p className="text-xl text-slate-400 mb-8 max-w-lg mx-auto">
        Je suis développeur. Bienvenue sur mon tout nouveau portfolio propulsé par Next.js et Supabase !
      </p>
      <div className="space-x-4">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition">
          Voir mes projets
        </button>
        <button className="border border-slate-600 hover:border-slate-400 py-3 px-6 rounded-lg transition">
          Me contacter
        </button>
      </div>
    </div>
  );
}
