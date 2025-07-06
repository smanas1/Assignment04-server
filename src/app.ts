import express, { Request, Response } from "express";
import booksRoutes from "./app/controllers/books.controller";
import borrowRoute from "./app/controllers/borrow.controller";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://assignment04-client.vercel.app/",
      "http://localhost:3000",
    ],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App");
});

app.use("/api", booksRoutes);
app.use("/api", borrowRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: "API endpoint not found.",
    success: false,
    error: {
      type: "NotFound",
      details:
        "The requested resource could not be found on this server. Please check the URL and try again.",
    },
  });
});

export default app;
