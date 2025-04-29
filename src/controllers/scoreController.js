import score from "../models/score.js";

// Get all scores
export const getScores = async (req, res) => {
  try {
    const scores = await score.find();
    if (!scores) {
      return res.status(404).json({ message: "No scores found" });
    }
    res.status(200).json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
