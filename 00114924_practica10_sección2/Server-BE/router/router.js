import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { signIn } from "../controllers/auth/signIn.js";
import { signUp } from "../controllers/auth/signUp.js";
import { displayHome } from "../controllers/system/displayHome.js";
import { getUsers,getUserById } from "../controllers/users/getUsers.js";
import { updateUser } from "../controllers/users/updateUser.js";
import { deleteUser } from "../controllers/users/deleteUser.js";

import { getCustomers } from "../controllers/customers/getCustomers.js";
import { searchCustomers } from "../controllers/customers/searchCustomers.js";

import { createSale } from "../controllers/sales/createSale.js";
import { getSales } from "../controllers/sales/getSales.js";
import { getSalesReport } from "../controllers/sales/getSalesReport.js";

const router = express.Router();

router.get("/", displayHome);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

router.get("/api/customers", verifyToken, getCustomers);
router.get("/api/customers/search", verifyToken, searchCustomers);

router.post("/api/sales", verifyToken, createSale);
router.get("/api/sales", verifyToken, getSales);
router.get("/api/sales/report", verifyToken, getSalesReport);

export default router;
