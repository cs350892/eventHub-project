import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm.jsx';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, IndianRupee, Users } from 'lucide-react';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setError('Failed to load events');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const res = await fetch('/api/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(eventData),
      });
      const data = await res.json();
      if (data._id) {
        setEvents([...events, { ...eventData, _id: data._id, organizer: { name: 'Admin' }, attendeeCount: 0, attendees: [] }]);
        setShowForm(false);
      } else {
        alert(data.error || 'Error creating event');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      const res = await fetch(`/api/events/${editingEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(eventData),
      });
      const data = await res.json();
      if (data._id) {
        setEvents(
          events.map((event) =>
            event._id === editingEvent._id
              ? { ...eventData, _id: event._id, organizer: event.organizer, attendeeCount: event.attendeeCount, attendees: event.attendees }
              : event
          )
        );
        setEditingEvent(null);
      } else {
        alert(data.error || 'Error updating event');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const res = await fetch(`/api/events/${eventId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (res.ok) {
          setEvents(events.filter((event) => event._id !== eventId));
        } else {
          alert('Error deleting event');
        }
      } catch (err) {
        alert('Error connecting to server');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (showForm || editingEvent) {
    return (
      <div className="max-w-4xl mx-auto">
        <EventForm
          event={editingEvent}
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          onCancel={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your events and track attendee registrations</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>
      {events.length > 0 ? (
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 mr-2" />
                        <span>{event.price === 0 ? 'Free' : `₹${event.price}`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit Event"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Attendees ({event.attendeeCount} / {event.maxAttendees})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.maxAttendees - event.attendeeCount} spots remaining
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((event.attendeeCount / event.maxAttendees) * 100, 100)}%` }}
                    ></div>
                  </div>
                  {event.attendees && event.attendees.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Recent registrations:</p>
                      <div className="flex flex-wrap gap-2">
                        {event.attendees.slice(0, 6).map((attendee, index) => (
                          <div
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                            title={attendee.user.email}
                          >
                            {attendee.user.name}
                          </div>
                        ))}
                        {event.attendees.length > 6 && (
                          <div className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            +{event.attendees.length - 6} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Yet</h3>
          <p className="text-gray-500 mb-6">You haven't created any events yet. Get started by creating your first event!</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create Your First Event</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;