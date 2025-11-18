# Travel Journal 🧳

A full-stack travel journaling app built with Node.js, React, and MySQL.

## Features
- User signup, login, logout (JWT auth)
- Add, edit, delete travel entries
- Location, date, rating, notes, and image support
- Responsive dark-themed UI

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL

## Setup
1. Create MySQL database `travel_journal` and set up tables
2. Add `.env` files in `server/` and `client/` with correct config
3. Run backend: `npm run dev` in `server/`
4. Run frontend: `npm run dev` in `client/`
5. MySQL: 
USE travel_journal;
SELECT * FROM entries ORDER BY created_at DESC;

