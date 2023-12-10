import { Router } from "express";
import { registerUser } from "../services/register.service.js";

const registerRoutes = Router();

registerRoutes.post("/register", (req, res) => {
  const { username, password, name, surname } = req.body;

  if (!username || !password || !name || !surname) {
    return res
      .status(400)
      .json({ message: "Fill the inputs" });
  }

  registerUser(username, password, name, surname, (err, newUser, message) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!newUser) {
      return res.status(400).json({ message });
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  });
});

export default registerRoutes;
