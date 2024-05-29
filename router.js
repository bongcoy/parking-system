import express from "express";
import UserController from "./controllers/userController.js";

const router = express.Router();

// USER
router.post("/user", UserController.store);
router.post("/user/me", UserController.me);
router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.detail);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.post("/user/login", UserController.login);

export default router;
