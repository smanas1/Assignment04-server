import { Document, Model, model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";
import { IBorrowBook } from "../interfaces/borrow.interface";

const BookSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [3, "Author name must be at least 3 characters long"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      uppercase: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      message: "`{VALUE}` is not a valid genre",
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: [true, "ISBN Already Exist"],
      trim: true,
      minlength: [2, "ISBN must be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Book description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Number of copies cannot be negative"],
    },
    available: {
      type: Boolean,
      required: [true, "Availability status is required"],
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

BookSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  function (next) {
    const update = this.getUpdate() as any;

    // If copies is being updated
    if (update.copies !== undefined) {
      update.available = update.copies > 0;
    }

    // Handle $set operator
    if (update.$set && update.$set.copies !== undefined) {
      update.$set.available = update.$set.copies > 0;
    }

    next();
  }
);

BookSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number,
  dueDate: string
) {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }
  if (!dueDate) {
    throw new Error("Due date is required");
  }
  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  book.copies -= quantity;

  if (book.copies === 0) {
    book.available = false;
  }
  await book.save();
  return book;
};

export const Book = model<IBooks, Model<IBooks> & IBorrowBook>(
  "Book",
  BookSchema
);
