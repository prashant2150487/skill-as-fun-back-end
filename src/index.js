import express from "express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
