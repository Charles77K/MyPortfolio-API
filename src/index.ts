import express, { Application } from "express";
import connectDB from "./db/server";
import dotenv from "dotenv";
import { globalErrorHandler } from "./utils/errorHandler";

const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app: Application = express();

import projectRouter from "./routes/projectRoutes";
import blogRouter from "./routes/blogRoutes";
import messageRouter from "./routes/messageRoutes";

app.use(cors());

app.use(express.json());

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/message", messageRouter);

connectDB();

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
