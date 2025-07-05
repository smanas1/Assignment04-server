"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
BookSchema.pre("save", function (next) {
    this.available = this.copies > 0;
    next();
});
BookSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
    const update = this.getUpdate();
    // If copies is being updated
    if (update.copies !== undefined) {
        update.available = update.copies > 0;
    }
    // Handle $set operator
    if (update.$set && update.$set.copies !== undefined) {
        update.$set.available = update.$set.copies > 0;
    }
    next();
});
BookSchema.statics.borrowBook = function (bookId, quantity, dueDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
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
        yield book.save();
        return book;
    });
};
exports.Book = (0, mongoose_1.model)("Book", BookSchema);
