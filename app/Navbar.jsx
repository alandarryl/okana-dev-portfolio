import Link from "next/link";


const Navbar = () => {

    return(
        <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-cyan-400 hover:text-cyan-300">
              ⚡ MonPortfolio
            </Link>
            <div className="space-x-6">
              <Link href="/presentation" className="hover:text-cyan-400 transition">Présentation</Link>
              <Link href="/projects" className="hover:text-cyan-400 transition">Projets</Link>
              <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
            </div>
          </div>
        </nav>
    )
}

export default Navbar;
