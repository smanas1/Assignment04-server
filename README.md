# Library Management App

A simple Node.js + Express + MongoDB application for managing a library's books and borrowing system.

## Features

- Add, update, delete, and list books
- Borrow books and track borrowed quantities
- Get a summary of borrowed books
- RESTful API structure



## Getting Started

### Prerequisites

- Node.js
- MongoDB 
- TypeScript

### Installation

1. Clone the repository
2. Install dependencies:

   ```sh
   npm install
   ```

3. Set your MongoDB connection string in [`src/server.ts`](src/server.ts ) if needed.

### Running the App

- For development (with hot reload):

  ```sh
  npm run dev
  ```

- For production:

  ```sh
  npm run build
  npm start
  ```

### API Endpoints

#### Books

- `POST   /api/books` — Create a new book
- `GET    /api/books` — List all books (supports filtering, sorting, limiting)
- `GET    /api/books/:bookId` — Get a book by ID
- `PUT    /api/books/:bookId` — Update a book by ID
- `DELETE /api/books/:bookId` — Delete a book by ID

#### Borrow

- `POST   /api/borrow` — Borrow a book
- `GET    /api/borrow` — Get summary of borrowed books



## Deployment

- The project is ready for deployment on Vercel using the provided [`vercel.json`](vercel.json ).



---

**Made with Node.js, Express, TypeScript, and MongoDB.**
