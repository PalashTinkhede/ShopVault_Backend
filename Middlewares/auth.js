import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const Authenticated = async (req, res, next) => {
  const auth = req.header("Auth");

  if (!auth) return res.json({ message: "Login first" });
  // console.log(auth)

  const decoded = jwt.verify(auth, "!@#$%^&*()");

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "User not exist" });

  req.user = user;
  next();

  // console.log(decoded)
};
