"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBook = void 0;
const mongoose_1 = require("mongoose");
const borrowBookSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.BorrowBook = (0, mongoose_1.model)("BorrowBook", borrowBookSchema);
