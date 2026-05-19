# CleanRest 

A real-time restroom finder web app that helps users locate clean,
available public restrooms across Lagos.

## Problem Statement

Finding a clean, functional public restroom in a busy city like Lagos
is a daily frustration. CleanRest solves this by providing live
availability, cleanliness scores, and a pay-per-use QR payment system
— all in one place.

## Features

- **Three role-based views** — User, Cleaner, and Admin
- **Live status indicators** — Available, Occupied, No Water, Needs Cleaning
- **Distance calculation** — Haversine formula calculates real GPS distance
- **QR payment simulation** — Pay-per-use flow with processing simulation
- **Cleaner dashboard** — Priority task list for restrooms below 75% cleanliness
- **Admin CRUD panel** — Add, edit, delete restrooms with live stats

## Tech Stack

- **Frontend:** React 19, Vite
- **State Management:** React useState hooks
- **Styling:** CSS (component-scoped)
- **Data Layer:** Structured dummy data simulating IoT sensor input
- **Deployment:** Vercel

## Project Structure

src/
├── App.jsx                  # Root component, manages role-based view switching
├── components/
│   ├── UserView.jsx         # Browse, filter, and pay for restrooms
│   ├── CleanerView.jsx      # Cleaning task management with priority system
│   ├── AdminView.jsx        # Full CRUD dashboard with live statistics
│   └── RestroomCard.jsx     # Reusable card component for each restroom
├── data/
│   └── restroomData.js      # Dummy data simulating backend/sensor responses
├── services/
│   └── restroomService.js   # Business logic — distance, status, payments
└── styles/                  # Component-scoped CSS files


## Running Locally

```bash
git clone https://github.com/spiffamani/CleanRest.git
cd CleanRest
npm install
npm run dev
```

Visit `http://localhost:5173`

## Live Demo

[cleanrest.vercel.app](https://cleanrest.vercel.app)

## Roadmap

- [ ] Java Spring Boot REST API backend
- [ ] Real IoT sensor integration (ESP32)
- [ ] Leaflet.js real map integration
- [ ] User authentication
- [ ] Real payment gateway (Paystack)