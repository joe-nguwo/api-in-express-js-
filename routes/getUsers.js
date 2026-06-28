import express from "express";
import { Customers } from "../models/customers.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/users", async (req, res) => {
    const { search } = req.query;

    try {
        let users;

        if (search) {
            users = await Customers.findAll({
                where: {
                    Fname: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
        } else {
            users = await Customers.findAll({
                limit: 20
            });
        }

        res.status(200).json({
            message: "ok",
            data: users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
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