import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

// Initialize the app
const app = express();
app.use(cors({
  origin: "*", // Replace '*' with your client domain if needed for security
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}))
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
const PORT = process.env.PORT || 5001;
app.use("/api", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
