import express from "express"
import { Customers } from "../models/customers.js"

const router = express.Router()

router.get("/users",async (req,res)=>{
    try {
        const users = await Customers.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

 export default router