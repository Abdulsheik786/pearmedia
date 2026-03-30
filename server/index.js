import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import textRoutes from "./routes/text.js";
import imageRoutes from "./routes/image.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/text", textRoutes);
app.use("/api/image", imageRoutes);

// health check (IMPORTANT for deployment)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});