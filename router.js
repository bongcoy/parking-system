import express from "express";
import UserController from "./controllers/userController.js";

const router = express.Router();

// USER
router.post("/user", UserController.store);
router.get("/users", UserController.getAll);

export default router;
