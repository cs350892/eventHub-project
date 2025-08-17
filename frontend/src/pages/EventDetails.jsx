import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleEvents } from "../data";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  XCircle,
  Clock,
  Heart,
  Share2,
  User,
} from "lucide-react";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = sampleEvents.find((e) => e.id === id); // Assuming string IDs in data.js

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isEventPast = (dateString, timeString) => {
    const eventDateTime = new Date(
      `${new Date(dateString).toISOString().split("T")[0]}T${timeString}`
    );
    return eventDateTime < new Date();
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: "bg-blue-100 text-blue-800",
      Business: "bg-green-100 text-green-800",
      Arts: "bg-purple-100 text-purple-800",
      Sports: "bg-orange-100 text-orange-800",
      Music: "bg-pink-100 text-pink-800",
      Education: "bg-indigo-100 text-indigo-800",
      Health: "bg-teal-100 text-teal-800",
      Food: "bg-yellow-100 text-yellow-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.Other;
  };

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The event you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const isPastEvent = isEventPast(event.date, event.time);
  const spotsRemaining = event.maxAttendees - event.attendeeCount;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={
                  event.imageUrl ||
                  "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg"
                }
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category}
                </span>
                {isPastEvent && (
                  <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Past Event
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">{formatDate(event.date)}</p>
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-sm">
                      {event.attendeeCount} / {event.maxAttendees}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <IndianRupee className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-sm">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About This Event
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Organizer
                </h3>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {event.organizer.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Spots Remaining
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {spotsRemaining} / {event.maxAttendees}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    spotsRemaining === 0
                      ? "bg-red-500"
                      : spotsRemaining <= 5
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.max(
                      (event.attendeeCount / event.maxAttendees) * 100,
                      5
                    )}%`,
                  }}
                ></div>
              </div>
              {spotsRemaining === 0 && (
                <p className="text-sm text-red-600 mt-2 font-medium">
                  This event is full
                </p>
              )}
            </div>
            {!isPastEvent && (
              <div className="space-y-3">
                <button
                  disabled={spotsRemaining === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    spotsRemaining === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {spotsRemaining === 0 ? "Event Full" : "Register Now"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex items-center justify-center py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            )}
            {isPastEvent && (
              <div className="text-center py-4">
                <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500">This event has ended</p>
              </div>
            )}
            {event.attendees && event.attendees.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Recent Registrations
                </h3>
                <div className="space-y-2">
                  {event.attendees.slice(0, 5).map((attendee, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-gray-600">
                          {attendee.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        {attendee.user.name}
                      </span>
                    </div>
                  ))}
                  {event.attendees.length > 5 && (
                    <p className="text-xs text-gray-500 mt-2">
                      +{event.attendees.length - 5} more attendees
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
