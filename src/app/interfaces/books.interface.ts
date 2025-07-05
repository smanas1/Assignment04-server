import { Document, Model } from "mongoose";

export interface IBooks extends Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";

  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface borrowBook extends Model<IBooks> {
  borrowBook: (bookId: string, quantity: number) => Promise<IBooks>;
}

export interface IFilter {
  genre: string;
}
