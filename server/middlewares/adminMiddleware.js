const jwt = require("jsonwebtoken");
const ADMIN_SECRET = process.env.ADMIN_SECRET;

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    let data = jwt.verify(token, ADMIN_SECRET);
    req.user = data.id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = adminMiddleware;

