# Employee Task Tracker

A full-stack application for managing employee tasks and productivity.

## Project Structure

```
employee-task-tracker/
├── frontend/              # React/Vue frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service calls
│   │   ├── types/         # TypeScript type definitions
│   │   └── hooks/         # Custom React hooks
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind CSS configuration
├── backend/               # Node.js/Express backend API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Data models
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   ├── prisma/            # Prisma ORM configuration
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── database/
│   └── schema.sql         # Database schema
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Database (PostgreSQL/MySQL)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

## Development

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
npm run dev
```

## License

MIT
