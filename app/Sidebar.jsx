
const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col  ">
        <div className="p-4">
            <h2 className="text-lg font-semibold">Sidebar</h2>
            <ul className="mt-4">
                <li className="mb-2">
                    <a href="/" className="text-blue-500 hover:underline">
                        Home
                    </a>
                </li>
                <li className="mb-2">
                    <a href="/About" className="text-blue-500 hover:underline">
                        About
                    </a>
                </li>   
                <li className="mb-2">
                    <a href="/About/Projects" className="text-blue-500 hover:underline">
                        Projects
                    </a>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default Sidebar;
