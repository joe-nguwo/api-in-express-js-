import express from "express"
import { Customers } from "../models/customers.js"

const router = express.Router()

router.get("/users",async (req,res)=>{
    try {
        const users = await Customers.findAndCountAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/users/:id", async(req,res)=>{
    const id = req.query.id
    try {

        const userid = Customers.findByPk(id)
        res.status(200).json({"users":userid})
        
    } catch (error) {
        res.status(500).json({"message":"user not found"})
        
    }

})

 export default router