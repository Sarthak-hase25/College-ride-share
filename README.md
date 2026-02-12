# College Ride Share

A web platform for college students to share rides, save money, and connect with fellow students.

## Features

- User authentication (signup/login)
- Post and browse rides
- Search rides by location and date
- Book available rides
- Manage your rides and bookings
- User profile management
- Contact form

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** EJS, Tailwind CSS
- **Authentication:** bcrypt, express-session

## Installation

1. Clone the repository
```bash
git clone https://github.com/sarthak-hase25/college-ride-share.git
cd college-ride-share
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/college-ride-share
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
```

4. Start the application
```bash
npm run dev
```

5. Open http://localhost:3000

## Project Structure
```
├── controllers/    # Business logic
├── models/        # Database models
├── routes/        # API routes
├── views/         # EJS templates
├── middleware/    # Auth middleware
└── server.js      # Entry point
```

## Scripts

- `npm start` - Production server
- `npm run dev` - Development server with nodemon

