import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home, PlusCircle } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            <Calendar className="h-8 w-8" />
            <span>EventHub</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Home className="h-4 w-4" />
              <span>Events</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
              <PlusCircle className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;