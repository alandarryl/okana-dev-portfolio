import Link from "next/link";

const Navbar = () => {
  return (
    // Remplacement du bg-slate-800 opaque par un fond semi-transparent + effet de flou (backdrop-blur)
    <nav className="bg-[#090d16]/70 backdrop-blur-md border-b border-white/5 p-4 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* Logo plus élégant avec un dégradé discret */}
        <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-300 transition-all">
          ⚡ MonPortfolio
        </Link>
        
        {/* Liens avec une couleur par défaut plus douce (slate-400) pour créer de la hiérarchie visuelle */}
        <div className="flex items-center space-x-6 text-sm font-medium text-slate-400">
          <Link href="/presentation" className="hover:text-white transition-colors duration-200">
            Présentation
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors duration-200">
            Projets
          </Link>
          
          {/* Le lien Contact transformé en un petit bouton d'appel à l'action discret */}
          <Link 
            href="/contact" 
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Contact
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;