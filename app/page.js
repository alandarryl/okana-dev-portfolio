import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div  >left side</div>
      <div>right side</div>
    </div>
  );
}
