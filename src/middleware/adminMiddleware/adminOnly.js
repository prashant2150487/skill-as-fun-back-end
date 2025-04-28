const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user information found" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};
export default adminOnly;
