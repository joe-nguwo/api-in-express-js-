import express from "express";
const router = express.Router();
import getUsers from "../handlers/getUsers";
import deleteUsers from "../handlers/deleteUsers";

router.get("/users",getUsers);
router.delete("/users/:id",deleteUsers);

export default router;
