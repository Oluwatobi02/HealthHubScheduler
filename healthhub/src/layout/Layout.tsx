import React, { useState, ReactNode } from "react";
import ProfileIcon from "../Patient/icons/ProfileIcon";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useDisclosure } from "@nextui-org/react";
import Notifications from "../components/Notifications";
import { useAppContext } from "../../Context/customHook";

const links = [
  { link: 'dashboard', title: 'Dashboard' },
  { link: 'appointments', title: 'Appointments' },
  { link: 'professionals', title: 'Professionals' },
  { link: "resources", title: 'Healthcare & Resources' },
];

interface LayoutProps {
  children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {user, isAuthenticated} = useAppContext()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const {isOpen, onOpenChange, onOpen} = useDisclosure()

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between p-4 items-center bg-gray-100">
        <button 
          className="p-2 focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} 
            />
          </svg>
        </button>
        <div className="flex gap-6">
        <div className="relative inline-block cursor-pointer">
          <FaBell className="text-2xl" onClick={onOpen}/>  
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {user?.notifications.length}
        </span>
        <Notifications isOpen={isOpen} onOpenChange={onOpenChange} notis={user?.notifications} />
          </div>
          {isAuthenticated && <ProfileIcon />}

        </div>
      </div>
      <div className="flex flex-1">
        <div className={`bg-gray-100 transform ${sidebarOpen ? 'translate-x-0 w-1/4' : '-translate-x-full w-0'} transition-transform duration-300 ease-in-out`}>
          <div className={`ui fluid vertical tabular menu ${sidebarOpen ? 'h-full' : 'h-0'}`}>
            {links.map((link, index) => (
              <Link
                to={`/${link.link}`}
                className={`item ${location.pathname === `/${link.link}` ? 'active' : ''}`}
                key={index}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-3/4' : 'w-full'} p-4`}
        >
          <div className="ui segment h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

