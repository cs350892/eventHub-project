EventHub
EventHub is a web application for discovering, managing, and registering for events. The frontend is fully implemented using React, Vite, React Router, Tailwind CSS, and Lucide React for icons. The backend is planned to be developed to handle data persistence and API functionality. This README provides instructions for setting up and running the frontend, along with an outline of the next steps for backend development.
Table of Contents

Features
Technologies
Project Status
Frontend Setup
Prerequisites
Installation
Running the Frontend


Frontend File Structure
Backend Development (Next Steps)
Proposed Tech Stack
Planned API Endpoints
Backend Tasks
Optional Features


Contributing
License

Features

Event Discovery: Browse and filter events by search term, category, or date on the home page.
Event Details: View detailed event information, including date, time, location, price, attendee count, and organizer details.
Event Management: Create, edit, and delete events via a user-friendly dashboard.
Responsive Design: Fully responsive UI styled with Tailwind CSS, ensuring compatibility across devices.
Interactive UI: Smooth navigation with React Router and intuitive icons using Lucide React.
Temporary Data: Uses static data (src/data.js) for events and categories, to be replaced by a backend.

Technologies

Frontend:
React (^18.2.0)
Vite (^4.0.0)
React Router (^6.14.0)
Tailwind CSS (^3.3.0)
Lucide React (^0.263.0)
UUID (^9.0.0)



Project Status

Frontend: Completed and fully functional.
Features include event listing, filtering, detailed views, and a dashboard for managing events.
Uses static data from src/data.js for event and category data.
All <i data-lucide> tags have been replaced with Lucide React components for proper icon rendering.
UUID package integrated for generating unique event IDs in the dashboard.
Error handling, input validation, and responsive styling implemented.
Fixed the uuid import issue by ensuring the package is installed.


Backend: Not yet implemented. The next task is to develop a RESTful API to replace static data with persistent storage and enable dynamic data management.

Frontend Setup
Prerequisites

Node.js: Version 18.x or higher.
npm: Version 8.x or higher.
Git: For cloning the repository.

Installation

Clone the repository:
git clone https://github.com/your-username/eventhub.git
cd eventhub


Install dependencies:
npm install

This installs react, react-dom, react-router-dom, lucide-react, uuid, and other dependencies listed in package.json.

Verify the package.json includes:
{
  "name": "eventhub",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    "lucide-react": "^0.263.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}


Ensure Tailwind CSS is configured in vite.config.js:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});


Verify src/index.css includes Tailwind directives:
@tailwind base;
@tailwind components;
@tailwind utilities;



Running the Frontend

Start the development server:
npm run dev


Open your browser and navigate to http://localhost:5173 (or the port shown in the terminal).

Test the following routes:

/: Home page with event listing and filters (search, category, date).
/dashboard: Dashboard for creating, editing, and deleting events.
/events/:id: Event details page, displaying event information or a "Not Found" message if the ID is invalid.


Troubleshooting:

If you encounter a Failed to resolve import "uuid" error, ensure the uuid package is installed (npm install uuid) and restart the server (npm run dev).
Check the browser's developer tools (F12) for console errors.
Verify that all Lucide icons render correctly and Tailwind styles are applied.



Frontend File Structure
eventhub/
├── src/
│   ├── components/
│   │   ├── EventCard.jsx        # Component for displaying individual event cards
│   │   ├── EventForm.jsx        # Form for creating/editing events
│   │   ├── Navbar.jsx           # Navigation bar with links to Home and Dashboard
│   ├── pages/
│   │   ├── Dashboard.jsx        # Dashboard page for managing events
│   │   ├── EventDetails.jsx     # Page for viewing event details
│   │   ├── Home.jsx             # Home page with event listing and filters
│   ├── App.jsx                  # Main app component with routing
│   ├── data.js                  # Static sample data for events and categories
│   ├── index.css                # Tailwind CSS configuration
│   ├── index.jsx                # Entry point for React app
├── index.html                   # HTML entry point for Vite
├── package.json
├── vite.config.js
├── tailwind.config.js

Backend Development (Next Steps)
The frontend currently uses static data from src/data.js. The next task is to develop a backend to provide persistent storage and a RESTful API for dynamic data management.
Proposed Tech Stack

Node.js + Express: For building a RESTful API to handle HTTP requests.
MongoDB: For storing event data (flexible schema suitable for events).
Mongoose: For MongoDB object modeling and schema validation.
CORS: To enable communication between the frontend and backend.
Dotenv: For managing environment variables (e.g., database URI, port).
UUID: For generating unique event IDs.

Alternatives: If preferred, you can use:

Python/FastAPI or Django instead of Node.js/Express.
PostgreSQL or Firebase instead of MongoDB.
Please specify your preferred stack if different from the proposed one.

Planned API Endpoints
The backend will implement the following RESTful API endpoints:

GET /api/events: Retrieve all events.
GET /api/events/:id: Retrieve a single event by ID.
POST /api/events: Create a new event.
PUT /api/events/:id: Update an existing event.
DELETE /api/events/:id: Delete an event.
(Optional) POST /api/events/:id/register: Register a user for an event (increments attendeeCount and adds user to attendees).

Backend Tasks

Set Up Backend Project:

Initialize a new Node.js project in a separate directory (e.g., eventhub-backend).
Install dependencies: Express, Mongoose, CORS, Dotenv, UUID.
Configure environment variables for MongoDB connection and server port.


Database Setup:

Set up MongoDB locally or use a cloud service like MongoDB Atlas.
Define a Mongoose schema for events matching the structure in src/data.js:
Fields: id (string), title, description, date, time, location, category, maxAttendees, attendeeCount, price, imageUrl, organizer, attendees.


Seed the database with sample events for testing.


Implement API Routes:

Create routes for CRUD operations (create, read, update, delete) on events.
Ensure proper error handling (e.g., 404 for non-existent events, 400 for invalid data).


Update Frontend:

Install axios in the frontend (npm install axios) for making API requests.
Replace static data imports in Home.jsx, EventDetails.jsx, and Dashboard.jsx with API calls to the backend.
Example: Use axios.get('http://localhost:5000/api/events') to fetch events in Home.jsx.
Add loading states and error messages for API requests.


Testing:

Test API endpoints using tools like Postman or cURL.
Verify frontend-backend integration by checking network requests in the browser’s developer tools.
Ensure data persistence (e.g., created events remain after a server restart).


Deployment Considerations:

Host the backend on a platform like Render, Heroku, or AWS.
Host the frontend on Vercel, Netlify, or GitHub Pages.
Configure CORS to allow requests from the deployed frontend URL.
Use environment variables for sensitive data (e.g., MongoDB URI).



Optional Features

User Authentication: Implement JWT-based authentication to restrict dashboard access to logged-in users.
Requires: User model, login/register endpoints, password hashing (e.g., bcrypt).


Event Registration: Allow users to register for events via the "Register Now" button on the event details page.
Update attendees and attendeeCount in the database.


Image Upload: Enable organizers to upload custom event images (e.g., using Multer with Express or a cloud storage service like AWS S3).
Payment Integration: Add payment processing for paid events (e.g., Stripe or PayPal).
Advanced Search: Enhance the search functionality with server-side filtering or full-text search.

Please specify which optional features you want to prioritize, if any.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

For backend development, please coordinate on the proposed tech stack and API design.
