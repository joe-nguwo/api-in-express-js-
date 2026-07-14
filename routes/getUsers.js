import express from "express";
import getUsers from "../handlers/getUsers.js";
import deleteUsers from "../handlers/deleteUsers.js";
import CacheMiddleWare from "../middleware/redis.js";
const router = express.Router();

router.get("/users",CacheMiddleWare(),getUsers);
router.delete("/users/:id",deleteUsers);

export default router;
