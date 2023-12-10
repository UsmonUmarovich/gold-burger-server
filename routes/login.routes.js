import { Router } from "express";
import { loginUser } from "../services/login.service.js";

const LoginRoutes = Router();

LoginRoutes.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  loginUser(username, password, (err, user, message) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ message });
    }

    res.status(200).json({ message: "Login successful", user });
  });
});

export default LoginRoutes;
