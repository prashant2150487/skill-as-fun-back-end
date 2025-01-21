import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

// Initialize the app
const app = express();
// Database connection
connectDB();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
