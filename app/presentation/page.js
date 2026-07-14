import Link from "next/link";
import Image from "next/image";

const mockProfile = {
  name: "Jonathan OKANA",
  title: "Développeur Full-Stack & UI/UX",
  bio: "Je conçois et développe des applications web robustes, performantes et centrées sur l'expérience utilisateur. je maîtrise les dernières technologies pour créer des solutions innovantes et efficaces.",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

const mockSkills = [
  { name: "React / Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "TypeScript", category: "Languages" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Backend" },
];

export default function PublicPortfolio() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* Bento Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          
          {/* Bloc Principal : Présentation + Image intégrée */}
          <div className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 flex flex-col justify-between gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Texte (prend de la place) */}
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20 w-fit block">
                  Disponible pour de nouveaux projets
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Salut, je suis <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{mockProfile.name}</span>
                </h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  {mockProfile.bio}
                </p>
              </div>

              {/* Image d'illustration ou portrait intégrée dans le bloc */}
              <div className="md:col-span-1 flex justify-center md:justify-end">
                <div className="relative w-32 h-32 md:w-full md:h-40 rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shadow-inner">
                  <Image 
                    src="/profile-avatar.png" // À mettre dans ton dossier /public
                    alt="Photo ou avatar de présentation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
            
            {/* Boutons d'actions du bloc */}
            <div className="flex gap-4">
              <a href="#projets" className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 hover:-translate-y-0.5 transition-all">
                Voir mes projets
              </a>
              <a href={mockProfile.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Bloc Secondaire : Compétences */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Mes Outils favoris</h3>
              <div className="flex flex-wrap gap-2">
                {mockSkills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 hover:border-cyan-500/30 hover:bg-cyan-950/20 transition duration-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 text-xs text-slate-500">
              Et d'autres technologies apprises au fil de mes expériences professionnelles.
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}