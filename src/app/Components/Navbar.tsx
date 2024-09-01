import React from "react";
import { Link } from "react-router-dom";

// Define the interface for the Navbar props
interface NavbarProps {
  path: string;
}

// Use the interface in the Navbar component
const Navbar: React.FC<NavbarProps> = ({ path }) => {
  return (
    <div className="bg-gradient-to-r rounded-lg from-blue-500 to-purple-500 text-white top-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-semibold hover:scale-125 hover:text-yellow-300 transition duration-300 ease-in-out">
            Book
          </Link>
          <Link to="/character" className="text-lg font-semibold hover:scale-125 hover:text-yellow-300 transition duration-300 ease-in-out">
            Character
          </Link>
          <Link to="/spell" className="text-lg font-semibold hover:scale-125 hover:text-yellow-300 transition duration-300 ease-in-out">
            Spell
          </Link>
          <Link to="/movies" className="text-lg font-semibold hover:scale-125 hover:text-yellow-300 transition duration-300 ease-in-out">
            Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
