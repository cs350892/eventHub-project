const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const User = require('../models/User');

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create event (admin only)
router.post('/add', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  const { title, description, date, time, location, category, maxAttendees, price, imageUrl } = req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      maxAttendees,
      price,
      imageUrl,
      organizer: req.user.id,
      attendeeCount: 0,
      attendees: [],
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all events
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name').populate('attendees.user', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single event
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name').populate('attendees.user', 'name email');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event (admin only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, organizer: req.user.id },
      { new: true }
    );
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete event (admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register for event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.attendeeCount >= event.maxAttendees) return res.status(400).json({ error: 'Event is full' });
    if (event.attendees.some((a) => a.user.toString() === req.user.id)) {
      return res.status(400).json({ error: 'Already registered' });
    }
    event.attendees.push({ user: req.user.id });
    event.attendeeCount += 1;
    await event.save();
    const updatedEvent = await Event.findById(req.params.id).populate('organizer', 'name').populate('attendees.user', 'name email');
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;