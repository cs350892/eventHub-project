import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, IndianRupee } from 'lucide-react';

function EventCard({ event }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-800',
      Business: 'bg-green-100 text-green-800',
      Arts: 'bg-purple-100 text-purple-800',
      Sports: 'bg-orange-100 text-orange-800',
      Music: 'bg-pink-100 text-pink-800',
      Education: 'bg-indigo-100 text-indigo-800',
      Health: 'bg-teal-100 text-teal-800',
      Food: 'bg-yellow-100 text-yellow-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={event.imageUrl || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg'}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {formatDate(event.date)} at {event.time}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {event.attendeeCount} / {event.maxAttendees} attendees
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <IndianRupee className="h-5 w-5 mr-3" />
            <div>
              <p className="font-medium">Price</p>
              <p className="text-sm">{event.price === 0 ? 'Free' : `₹${event.price}`}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-500">
            Organized by <span className="font-medium">{event.organizer.name}</span>
          </p>
        </div>
        <Link
          to={`/events/${event._id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;