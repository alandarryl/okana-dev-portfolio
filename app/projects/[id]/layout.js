import { supabase } from "../../../lib/supabase";

// Cette fonction magique de Next.js génère les métadonnées dynamiquement sur le serveur
export async function generateMetadata({ params }) {
  const id = params.id;

  // On récupère le projet sur Supabase juste pour ses textes SEO
  const { data: project } = await supabase
    .from("projects")
    .select("title, name, description")
    .eq("id", id)
    .single();

  if (!project) {
    return {
      title: "Projet Introuvable",
    };
  }

  const projectTitle = project.title || project.name;

  return {
    title: projectTitle, // Grâce au template du layout global, ça affichera : "Nom du Projet | MonPortfolio"
    description: project.description?.substring(0, 160), // Google coupe les descriptions à ~160 caractères
    openGraph: {
      title: `${projectTitle} | MonPortfolio`,
      description: project.description?.substring(0, 160),
      type: "article",
    },
  };
}

export default function ProjectLayout({ children }) {
  return <>{children}</>;
}