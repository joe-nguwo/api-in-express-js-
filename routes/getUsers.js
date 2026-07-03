import express from "express";
const router = express.Router();
import getUsers from "../handlers/getUsers.js";
import deleteUsers from "../handlers/deleteUsers.js";

router.get("/users",getUsers);
router.delete("/users/:id",deleteUsers);

export default router;
