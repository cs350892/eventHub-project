const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  maxAttendees: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendeeCount: { type: Number, default: 0 },
  attendees: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
});
module.exports = mongoose.model('Event', eventSchema);