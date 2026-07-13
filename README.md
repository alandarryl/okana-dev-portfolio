This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🚀 Portfolio & Dashboard Admin - Next.js + Supabase

Ce projet est un portfolio professionnel couplé à un panneau d'administration sécurisé (CMS privé) permettant de gérer dynamiquement le contenu en temps réel sans toucher au code.

## 🛠️ Stack Technique
- **Framework :** Next.js (App Router, Client & Server Components)
- **Styles :** Tailwind CSS
- **Base de données & Auth :** Supabase (PostgreSQL, GoTrue Auth)

## 📌 Fonctionnalités implémentées

### 🔐 Authentification & Sécurité
- Page de connexion privée (`/login`) connectée à Supabase Auth.
- Vérification automatique de la session utilisateur sur le Dashboard avec redirection automatique si non connecté.
- Politiques de sécurité (RLS) sur Supabase pour restreindre l'écriture/suppression aux administrateurs.

### 🎛️ Dashboard Admin (`/admin`)
Architecture ultra-modulaire basée sur le principe de la **Source unique de vérité**, permettant d'ajouter de nouveaux onglets via un simple objet de configuration.

- **📁 Section Projets (CRUD complet) :**
  - Formulaire d'ajout rapide avec titre, description, URL de projet et URL d'image d'illustration.
  - Grille d'affichage des projets en ligne avec rendu d'image conditionnel.
  - Système de suppression définitive.
  - Fenêtre pop-up (Modal) dédiée pour la modification, isolée dans un composant à part avec pré-remplissage des champs existants.

- **✉️ Section Messages :**
  - Lecture des messages reçus via la table `messages`.
  - Bouton de suppression des messages traités.

- **👤 Section Mon Profil :**
  - Formulaire d'édition unique gérant l'identité (Nom, Titre, Liens sociaux, Bio) via une opération `.upsert()` sur Supabase.

- **📊 Section Mon Parcours :**
  - Gestion des compétences (Skills) regroupées automatiquement par catégories techniques (*Frontend, Backend, DevOps...*).
  - Gestion de l'historique d'Expériences professionnelles (Rôle, Entreprise, Description, Durée).
  - Gestion du cursus d'Éducation (Diplômes, Écoles, Années).

---

## 🚀 Prochaines étapes de développement

### 🌐 1. Partie Publique & Vitrine
- Connecter la page d'accueil publique aux tables `profile`, `skills`, `experiences`, `education` et `projects` en lecture seule (`.select()`).
- Concevoir une mise en page moderne en grilles (CSS Grid/Flexbox) mettant en valeur l'expérience utilisateur.

### 📈 2. SEO & Visibilité
- **Balises Meta Dynamiques :** Intégrer la configuration des métadonnées de Next.js (`Metadata`) sur les pages publiques en utilisant les données de la table `profile` (Titre, Nom).
- **Open Graph :** Configurer les visuels de partage social (LinkedIn, Twitter) pour optimiser le taux de clic.
- **Sitemap & Robots.txt :** Générer dynamiquement le plan du site pour les moteurs de recherche.


