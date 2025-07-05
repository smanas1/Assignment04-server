import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;
const mongoURI =
  "mongodb+srv://projects:project121@projects.ubggnuw.mongodb.net/library-management02?retryWrites=true&w=majority&appName=Projects";

const main = async () => {
  // Database Connection
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }

  //   Server Starting
  app.listen(PORT, () => {
    console.log(`Server is running on the Port ${PORT}`);
  });
};

main();
