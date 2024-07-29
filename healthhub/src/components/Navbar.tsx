// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { FaAccessibleIcon, FaAcquisitionsIncorporated, FaHome, FaInfoCircle,  } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 inset-x-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-xl font-bold text-green-500">
          <Link to="/">Health Hub Scheduler</Link>
        </div>
        <ul className="flex space-x-4 text-gray-700">
          <li>
            <Link to="/" className="flex items-center space-x-1">
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="#features" className="flex items-center space-x-1">
              <FaInfoCircle className="text-lg" />
              <span>Features</span>
            </Link>
          </li>
          <li>
            <Link to="#services" className="flex items-center space-x-1">
              <FaAccessibleIcon className="text-lg" />
              <span>Services</span>
            </Link>
          </li>
          <li>
            <Link to="#contact" className="flex items-center space-x-1">
              <FaAcquisitionsIncorporated className="text-lg" />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
