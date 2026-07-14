import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-12 py-16 max-w-6xl mx-auto px-6">
      {/* Colonne Gauche : Contenu écrit */}
      <div className="flex-1 text-left space-y-6 order-2 md:order-1">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Salut, moi c'est <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Jonathan OKANA</span> 👋
        </h1>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg">
          Je suis développeur full-stack. Je crée des applications web modernes et performantes, en utilisant les dernières technologies pour offrir des expériences utilisateur exceptionnelles.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-cyan-500/10">
            Voir mes projets
          </button>
          <button className="border border-slate-700 hover:border-slate-500 hover:bg-white/5 py-3 px-6 rounded-xl text-slate-300 transition-all">
            Me contacter
          </button>
        </div>
      </div>

      {/* Colonne Droite : L'Image vitrine */}
      <div className="flex-1 flex justify-center order-1 md:order-2">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full md:rounded-3xl overflow-hidden border-2 border-white/5 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group">
          <Image 
            src="/hero-image.png" // Remplace par le nom de ton image dans /public
            alt="Illustration de présentation"
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            priority // Charge l'image directement en haute priorité (au-dessus de la ligne de flottaison)
          />
        </div>
      </div>
    </section>
  );
}