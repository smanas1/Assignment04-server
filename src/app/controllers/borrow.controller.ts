import express, { Request, Response } from "express";
import { BorrowRequest } from "../interfaces/borrow.interface";
import { Book } from "../models/books.model";
import { BorrowBook } from "../models/borrow.model";
import { getErrorMessage } from "../error/getErrorMessage";

const borrowRoute = express.Router();

// Borrow a Book
borrowRoute.post(
  "/borrow",
  async (req: Request<{}, {}, BorrowRequest>, res: Response) => {
    try {
      const { book, quantity, dueDate }: BorrowRequest = req.body;
      await Book.borrowBook(book, quantity, dueDate);

      const borrowRecord = new BorrowBook({
        book: book,
        quantity: quantity,
        dueDate: new Date(dueDate),
      });
      const newData = await borrowRecord.save();
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: newData,
      });
    } catch (error) {
      res.status(400).json({
        message: getErrorMessage(error),
        success: false,
        errors: error,
      });
    }
  }
);

// Get Borrowed Books Summary

borrowRoute.get("/borrow", async (req: Request, res: Response) => {
  try {
    const result = await BorrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: getErrorMessage(error),
      success: false,
      errors: error,
    });
  }
});

export default borrowRoute;
