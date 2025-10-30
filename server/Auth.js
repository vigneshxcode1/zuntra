import jwt from "jsonwebtoken";
import userModel from "./model/Usermodel.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login first to access resource",
      });
    }

    const decode = jwt.verify(token, "zuntra");

    
    req.user = await userModel.findById(decode.userId);

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
