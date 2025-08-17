// ✅ Import your local images
import adhyaay from './assets/adhyaay.jpg';
import djnight from './assets/djnight.jpg';
import game from './assets/squidgame.webp';
import foodfest from './assets/foodfest.jpg';

export const sampleEvents = [
  {
    id: '1',
    title: 'HBTU - Tech Conference 2025',
    description: 'Join us for a deep dive into the latest tech trends and innovations.',
    date: '2025-09-01',
    time: '10:00',
    location: 'Kanpur, Uttar Pradesh',
    category: 'Technology',
    maxAttendees: 100,
    attendeeCount: 50,
    price: 100,
    imageUrl: adhyaay, // ✅ Local image imported
    organizer: { name: 'Tech Corp' },
    attendees: [
      { user: { name: 'Chandra', email: 'chandra12@gmaill.com' } },
      { user: { name: 'Rupali', email: 'Rupali122@gmail.com' } },
    ],
  },
  {
    id: '2',
    title: 'DJ Night - HBTU',
    description: 'Dance the night away with electrifying beats.',
    date: '2025-10-15',
    time: '19:00',
    location: 'kanpur, India',
    category: 'Music',
    maxAttendees: 300,
    attendeeCount: 180,
    price: 50,
    imageUrl: djnight, // ✅ Local image imported
    organizer: { name: 'Music Events Inc.' },
    attendees: [],
  },
  {
    id: '3',
    title: 'Squid game - HBTU Survival',
    description: 'Survival Game :)',
    date: '2025-11-05',
    time: '09:00',
    location: 'Kanpur, Uttar Pradesh',
    category: 'game',
    maxAttendees: 500,
    attendeeCount: 320,
    price: 0,
    imageUrl: game, 
    organizer: { name: 'UP Sports Committee' },
    attendees: [],
  },
  {
    id: '4',
    title: 'Food Festival 2025',
    description: 'Taste cuisines from across the world with live cooking shows.',
    date: '2025-12-20',
    time: '12:00',
    location: 'Mumbai, Maharashtra',
    category: 'Food',
    maxAttendees: 1000,
    attendeeCount: 700,
    price: 20,
    imageUrl: foodfest, // ✅ Local image imported
    organizer: { name: 'Foodies United' },
    attendees: [],
  },
];

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Business', label: 'Business' },
  { value: 'Arts', label: 'Arts' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Music', label: 'Music' },
  { value: 'Education', label: 'Education' },
  { value: 'Health', label: 'Health' },
  { value: 'Food', label: 'Food' },
  { value: 'Other', label: 'Other' },
];

export const sampleImages = [
  adhyaay, 
  djnight, 
  game,  
  foodfest, 
  'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg', 
];
