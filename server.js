import express from "express";
import "express-async-errors";
import "body-parser";

//cors
import cors from "cors";

//connect to DB
import connectDB from "./database/connectDB.js";

//dotenv
import dotenv from "dotenv";
dotenv.config();

//user route
import userRoutes from "./routes/userRoutes.js";
//image route
import uploadRoute from "./routes/uploadRoute.js";

//express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/api/auth", userRoutes);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("server!!");
});
//error handler middleware
import notFoundMiddleware from "./middleware/not-found-.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import bodyParser from "body-parser";

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log("listening to port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
