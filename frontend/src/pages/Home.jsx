import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventCard from '../components/EventCard.jsx';
import { Search, Filter, Calendar } from 'lucide-react';
import { categories } from '../data.js';

function Home() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    date: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view events');
        toast.error('Please log in to view events');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized: Please log in again');
          }
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        const errorMsg = err.message || 'Unable to connect to server';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || event.category === filters.category;
    const matchesDate = !filters.date || new Date(event.date).toISOString().split('T')[0] === filters.date;
    return matchesSearch && matchesCategory && matchesDate;
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: 'all', date: '' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <ToastContainer />
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore the Spirit of HBTU Kanpur
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          With a proud legacy of over a century, Harcourt Butler Technical University 
          stands as a hub of innovation, culture, and collaboration. Discover events 
          curated by our skilled students — from cutting-edge tech fests to vibrant 
          cultural nights — and be part of a community where tradition meets modern 
          excellence.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        {(filters.search || filters.category !== 'all' || filters.date) && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Search: "{filters.search}"
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Category: {filters.category}
                </span>
              )}
              {filters.date && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  Date: {new Date(filters.date).toLocaleDateString()}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      {loading && <div className="text-center py-12">Loading events...</div>}
      {error && <div className="text-center py-12 text-red-600">{error}</div>}
      {!loading && !error && filteredEvents.length > 0 ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      ) : (
        !loading && !error && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">
              {filters.search || filters.category !== 'all' || filters.date
                ? 'Try adjusting your search filters to find more events.'
                : 'There are no upcoming events at the moment. Check back later!'}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Home;