# Web Chat Application Architecture

## Table of Contents
- [Overview](#overview)
- [Architecture Components](#architecture-components)
- [Backend Architecture](#backend-architecture)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Security & Middleware](#security--middleware)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)

## Overview

The Web Chat Application is a modern real-time chat system built with a **monorepo architecture** using **Nx workspace**. It features a React frontend and Node.js backend with Socket.IO for real-time communication, providing a scalable foundation for chat applications.

## Architecture Components

### 1. Frontend (React Application)
- **Location**: `apps/web-chat-app/`
- **Framework**: React 18 with TypeScript
- **UI Library**: Ant Design (antd)
- **Styling**: Styled Components
- **Key Features**:
  - Room listing and search functionality
  - Real-time chat interface
  - User authentication modal
  - Responsive design

### 2. Backend (Chat Service)
- **Location**: `apps/chat-svc/`
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Real-time**: Socket.IO for WebSocket connections
- **Architecture Pattern**: Clean Architecture with separation of concerns

## Backend Architecture

The backend follows **Clean Architecture** principles with clear separation of concerns:

### Infrastructure Layer
```
src/app/infrastructure/
├── middleware/         # Authentication middleware
├── repository/mongo/   # Database models (Rooms, Messages)
├── socketio/          # WebSocket server setup
└── webserver/         # Express server configuration
```

### Interface Layer
```
src/app/interface/
├── controllers/       # Business logic (rooms, messages)
├── routes/           # API route definitions
└── types.ts          # TypeScript interfaces
```

### Testing Layer
```
src/tests/
├── rooms.test.ts     # Unit tests for room controllers
└── e2e/              # End-to-end tests
```

## API Endpoints

### Rooms API (`/api/rooms`)
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/` | Retrieve all rooms | No |
| `POST` | `/create` | Create new room | No |
| `POST` | `/join` | Join existing room | No |
| `POST` | `/exit` | Exit room | Yes (JWT) |

### Messages API
- Real-time messaging through Socket.IO
- Message persistence in MongoDB
- Auto-scroll to latest messages

## Data Models

### Room Schema
```typescript
interface Room {
  _id: ObjectId;
  roomId: string;
  description: string;
  participant: string[];
  createdAt: Date;
  __v: number;
}
```

### Message Schema
```typescript
interface Message {
  _id: ObjectId;
  roomId: ObjectId;
  roomIdName: string;
  username: string;
  text: string;
  createdAt: Date;
  __v: number;
}
```

## Key Features

### Real-time Communication
- Socket.IO for instant message delivery
- Auto-scroll to latest messages
- Connection status indicators
- Message persistence

### User Experience
- Clean, modern UI following design patterns
- Search and filter capabilities
- Modal-based room joining
- Responsive design for mobile/desktop
- Loading states and error handling

### Room Management
- Create and join rooms
- Search rooms by name or description
- View participant lists
- Real-time room updates

## Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + TypeScript | UI framework with type safety |
| Ant Design | Component library |
| Styled Components | Custom styling |
| Socket.IO Client | Real-time communication |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express.js | Server framework |
| MongoDB + Mongoose | Database and ODM |
| Socket.IO | WebSocket communication |
| JWT | Authentication |
| Helmet + CORS | Security |

### Development Tools
| Tool | Purpose |
|------|---------|
| Nx | Monorepo management |
| Jest + Sinon | Testing framework |
| ESLint | Code quality |
| Docker | Containerization |

## Security & Middleware

### Authentication
- JWT token-based authentication
- Protected routes for sensitive operations
- Token verification middleware

### Security Headers
- Helmet.js for security headers
- CORS configuration for cross-origin requests
- Input validation and sanitization

### Error Handling
- Global error handling middleware
- Structured error responses
- Request/response logging

## File Structure

```
web-chat/
├── apps/
│   ├── web-chat-app/              # React Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.tsx        # Main rooms page
│   │   │   │   ├── action.tsx     # Hooks and actions
│   │   │   │   ├── styled.tsx     # Styled components
│   │   │   │   └── room/          # Chat room components
│   │   │   ├── components/        # Reusable components
│   │   │   └── hoc/               # Higher-order components
│   │   └── public/
│   │
│   ├── chat-svc/                  # Node.js Backend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── infrastructure/
│   │   │   │   │   ├── middleware/
│   │   │   │   │   ├── repository/mongo/
│   │   │   │   │   ├── socketio/
│   │   │   │   │   └── webserver/
│   │   │   │   └── interface/
│   │   │   │       ├── controllers/
│   │   │   │       └── routes/
│   │   │   └── tests/             # Unit and E2E tests
│   │   └── Dockerfile
│   │
│   └── chat-svc-e2e/              # E2E Tests
│       └── src/chat-svc/
│           └── chat-svc.spec.ts
│
├── libs/                          # Shared libraries
├── tools/                         # Build tools
└── nx.json                        # Nx configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd web-chat

# Install dependencies
npm install

# Start MongoDB
mongod

# Start backend service
nx serve chat-svc

# Start frontend application
nx serve web-chat-app
```

### Running Tests
```bash
# Unit tests
nx test chat-svc

# E2E tests
nx e2e chat-svc-e2e

# All tests
nx run-many --target=test --all
```

### Environment Variables
```bash
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/webchat
JWT_SECRET=your-secret-key
PORT=8080

# Frontend (.env)
REACT_APP_API_URL=http://localhost:8080
REACT_APP_SOCKET_URL=http://localhost:8080
```

### Docker Deployment
```bash
# Build and run with Docker
docker build -t chat-svc ./apps/chat-svc
docker run -p 8080:8080 chat-svc
```

## Contributing

1. Follow the established architecture patterns
2. Write tests for new features
3. Use TypeScript for type safety
4. Follow the existing code style
5. Update documentation for new features

## License

This project is licensed under the MIT License.
