import { Types } from "mongoose";
import { IBooks } from "./books.interface";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowRequest {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface IBorrowBook {
  borrowBook(
    bookId: string,
    quantity: number,
    dueDate: string
  ): Promise<IBooks | null>;
}
