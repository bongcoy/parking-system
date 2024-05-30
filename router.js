import express from "express";
import UserController from "./controllers/userController.js";
import authenticate from "./middlewares/authenticate.js";

const router = express.Router();

// USER
router.post("/user", UserController.store);
router.get("/user/me", authenticate, UserController.me);
router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.detail);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);

export default router;
