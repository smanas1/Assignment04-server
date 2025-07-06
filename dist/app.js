"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = __importDefault(require("./app/controllers/books.controller"));
const borrow_controller_1 = __importDefault(require("./app/controllers/borrow.controller"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://assignment04-client.smanas.net",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Welcome to Library Management App");
});
app.use("/api", books_controller_1.default);
app.use("/api", borrow_controller_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        message: "API endpoint not found.",
        success: false,
        error: {
            type: "NotFound",
            details: "The requested resource could not be found on this server. Please check the URL and try again.",
        },
    });
});
exports.default = app;
