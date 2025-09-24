import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import EventDetails from './pages/EventDetails.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AuthForm from './components/AuthForm.jsx';

function ProtectedRoute({ children, adminOnly }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else if (adminOnly && role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, role, adminOnly, navigate]);

  return isAuthenticated && (!adminOnly || role === 'admin') ? children : null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <AuthForm
                onClose={() => navigate(location.state?.from || '/')}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;