import React from "react";
import { FaRegSnowflake } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { FaMap } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";

interface SidebarProps {
  activeLocation: string;
  setActiveLocation: (location: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="w-16 md:w-16 hidden md:flex flex-col items-center py-6 border-r ">
      <div className="mb-10">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <FaRegSnowflake size={28} className="text-blue-700 w-5 h-5" />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-8 flex-1">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
          <IoGridSharp size={28} className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
          <FaMap size={28} className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
          <FaRegCompass size={28} className="text-white w-5 h-5" />
        </button>
      </nav>

      <div className="flex flex-col items-center gap-6 mt-auto">
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors"></button>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
};
