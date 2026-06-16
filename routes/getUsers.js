import express from "express"
import { Customers } from "../models/customers.js"


const router = express.Router()

router.get("/users",async (req,res)=>{
    const search = req.query.search

    if(search){
        try {

            const users = await Customers.findAll({
                where:{
                    Fname:search

                }
            })

            return res.status(200).json({"message":"ok","data":users})
            
        } catch (error) {
            return res.status(400).json({"message":"no user"})
            
        }


    }

    else{
        try {
            const users = Customers.findAll({
                limit:20
            })

            return res.status(200).json({"message":"ok","data":users})

            
        } catch (error) {
            res.status(400).json({"message":"not found"})
            
        }
    }
    
    
    // try {
    //     const page = req.params.page
    //     const limit = 10;
    //     const offset = (page - 1) * limit 
    //     const users = await Customers.findAndCountAll({
    //          attributes:["Fname","Lname","phone"],
    //          order:[["createdAt","DESC"]],
    //          limit:limit,
    //          offset:offset,
    //     });
    //     res.status(200).json({"offset":offset,"limit":limit,"data":users.rows});
    // } catch (error) {
    //     console.error("Error fetching users:", error);
    //     res.status(500).json({ error: "Internal server error" });
    // }
}

);

router.get("/users/id/:id", async(req,res)=>{
    const id = req.query.id
    try {

        const userid = Customers.findByPk(id)
        res.status(200).json({"users":userid})
        
    } catch (error) {
        res.status(500).json({"message":"user not found"})
        
    }

})

 export default router