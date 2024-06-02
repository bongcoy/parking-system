import express from "express";
import UserController from "./controllers/user-controller.js";
import authenticate from "./middlewares/authenticate.js";
import ParkController from "./controllers/park-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

// USER
router.post("/user", UserController.store);
router.get("/user/me", authenticate, UserController.me);
router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.detail);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.post("/user/login", UserController.login);
router.post("/user/register", UserController.register);

// PARK
router.post("/park", authenticate, ParkController.order);
router.get("/park", authenticate, ParkController.getAllOrder);
router.get("/park/:id", ParkController.getOrderById);
router.put("/park/:id", authenticate, ParkController.update);
router.delete("/park/:id", ParkController.cancelOrder);

export default router;
