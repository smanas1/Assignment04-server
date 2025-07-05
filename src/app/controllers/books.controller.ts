import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { getErrorMessage } from "../error/getErrorMessage";

const booksRoutes = express.Router();

// 1 Create Books
booksRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    const books = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: books,
    });
  } catch (error: unknown) {
    res.status(400).json({
      message: getErrorMessage(error),
      success: false,
      errors: error,
    });
  }
});

// 2 Get All Books by Query Parameters

booksRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.filter) {
      filter.genre = req.query.filter;
    }

    const sortBy: string = (req.query.sortBy as string) || "title";
    const sortOrder: 1 | -1 = req.query.sort === "desc" ? -1 : 1;
    const sort: any = { [sortBy]: sortOrder };

    const limit: number = parseInt(req.query.limit as string);
    const allBooks = await Book.find(filter).sort(sort).limit(limit);

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error: any) {
    res.status(400).json({
      message: getErrorMessage(error),
      success: false,
      errors: error,
    });
  }
});

// 3 Get book by ID

booksRoutes.get("/books/:bookId", (req: Request, res: Response) => {
  (async () => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({
          message: "Book not found",
          success: false,
          data: null,
        });
      }
      res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        message: getErrorMessage(error),
        success: false,
        errors: error,
      });
    }
  })();
});

// Update Books

booksRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  (async () => {
    try {
      const bookId = req.params.bookId;
      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
        return res.status(404).json({
          message: "Book not found",
          success: false,
          data: null,
        });
      }
      const book = await Book.findOneAndUpdate(
        { _id: bookId },
        { $set: req.body },
        { new: true }
      );
      res.json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        message: getErrorMessage(error),
        success: false,
        errors: error,
      });
    }
  })();
});

// Delete Books

booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  (async () => {
    try {
      const bookId = req.params.bookId;
      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
        return res.status(404).json({
          message: "Book not found",
          success: false,
          data: null,
        });
      }
      await Book.findByIdAndDelete(bookId);
      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        message: getErrorMessage(error),
        success: false,
        errors: error,
      });
    }
  })();
});
export default booksRoutes;
