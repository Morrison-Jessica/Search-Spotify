# P & L Tracker

# Project Overview
This app tracks profit/loss entries and visualizes them on a user dashboard.

High-level flow:
User logs in with Google OAuth
   ꜜ
Server creates a JWT for app sessions (separate from Google tokens)
   ꜜ
User enters dollar amount (+ / -)
   ꜜ
Entry is saved in Google Sheets (date, user, amount)
   ꜜ
Dashboard shows totals and trends (day / week / month)

Design notes:
- neon pastels mint green, coral red/orange
- light/dark - soft white/charcoal bg/text 
- lavender/soft white button/text


# Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` (comes with Node.js)
- A local `.env` file (required for OAuth + JWT)

# Getting Started

1. Clone the repository:
<!-- ```bash
git clone https://github.com/Morrison-Jessica/Search-Spotify.git
cd Search-Spotify
``` -->

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_google_redirect_uri
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
node server.js
```

# Links
