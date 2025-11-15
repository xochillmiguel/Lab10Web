import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { signIn } from "../controllers/signIn.js";
import { signUp } from "../controllers/signUp.js";
import { displayHome } from "../controllers/displayHome.js";

import { getUsers,getUserById } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";

const router = express.Router();

router.get("/", displayHome);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
