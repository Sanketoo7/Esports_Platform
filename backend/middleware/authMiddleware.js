// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../services/user-service/models/User.js";
import Admin from "../services/admin-service/models/Admin.js";

const protect = async (req, res, next) => {
  let token;
  try {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer")) {
      token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

      // If token explicitly contains role: 'admin' (admin tokens include role)
      if (decoded.role === "admin") {
        req.admin = await Admin.findById(decoded.id).select("-password");
        if (!req.admin) return res.status(401).json({ message: "Admin not found ❌" });
        // also set req.user for convenience in handlers that expect req.user
        req.user = req.admin;
      } else {
        // default -> user token (or token without role)
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) return res.status(401).json({ message: "User not found ❌" });
      }

      return next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token ❌" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed ❌" });
  }
};

const admin = (req, res, next) => {
  // admin middleware must be used *after* protect
  if (req.admin) return next();
  // fallback: if user model has a role field and it's admin
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Not authorized as admin ❌" });
};

export { protect, admin };