


export const metadata = {
  title: "Dashboard Admin | Portfolio",
  description: "Espace d'administration pour gérer les contenus",
};

export default function AdminLayout({ children }) {
  return (
    // On force une hauteur minimale de tout l'écran et un fond gris clair neutre
    <div className="min-h-full flex flex-col bg-gray-100">
      {children}
    </div>
  );
}