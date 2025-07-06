# Library Management API

A RESTful API for managing a library system, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- Add, update, delete, and retrieve books
- Borrow books and track borrowed quantities
- Get a summary of borrowed books
- Input validation and error handling



## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (Atlas or local)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/smanas1/Assignment04-server.git
   cd <project-directory>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure MongoDB connection

   - The connection string is set in [`src/server.ts`](src/server.ts). Update it if needed.

### Running the Project

- **Development:**

  ```sh
  npm run dev
  ```

- **Production Build:**

  ```sh
  npm run build
  npm start
  ```

### API Endpoints

#### Books

- `POST /api/books` — Create a new book
- `GET /api/books` — Get all books (supports filtering, sorting, and limiting)
- `GET /api/books/:bookId` — Get a book by ID
- `PUT /api/books/:bookId` — Update a book by ID
- `DELETE /api/books/:bookId` — Delete a book by ID

#### Borrow

- `POST /api/borrow` — Borrow a book
- `GET /api/borrow` — Get summary of borrowed books

### Error Handling

- All errors return a JSON response with a `success: false` flag and error details.

### Deployment

- The project is configured for deployment on Vercel using [`vercel.json`](vercel.json).

