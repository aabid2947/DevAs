import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function Navbar() {
  const { token,user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      {user?<Link to="/" className="text-2xl font-bold">{user.username}</Link>
      :      <Link to="/login" className="text-2xl font-bold">Login</Link>
    }
        <div>
          {token ? (
            // If token exists, user is authenticated, show Logout button
            <button 
              onClick={logout} 
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            // If token doesn't exist, user is not authenticated, show Login/Register links
            <div className="space-x-4">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
