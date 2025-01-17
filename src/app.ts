import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to your Express.js app with TypeScript!");
});
const startServer=async ()=>{
  try{
    // await connectDB();
  }catch(error){
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

export default app;
