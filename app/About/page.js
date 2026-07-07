const AboutPage = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>About Me</h1>
      <p>Welcome to my about page!</p>
      <a href="/About/Projects" className="text-blue-500 hover:underline">
        My projects
      </a>
    </div>
  );
};

export default AboutPage;

export const metadata = {
  title: "About Me - Jonathan Okana Portfolio",
  author: "Jonathan Okana",
  keywords: ["Jonathan Okana", "portfolio", "about", "projects", "skills"],
  description: "Learn more about Jonathan Okana, his background, and his skills.",
};
