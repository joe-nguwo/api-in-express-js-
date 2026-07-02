import express from "express";
import { Customers } from "../models/customers.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/users", async (req, res) => {
    const { search,page } = req.query;
    const limit = 20;
    const offset = (page - 1 )* limit 

    try {
        let users;
        let  total_users;

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
                limit: limit,
                offset:offset,
            });

            total_users = await Customers.count()


        }

        res.status(200).json({
            message: "ok",
            data: [
                users
            ],
            pagination:{
                page:page,
                limit:limit,
                total_records:total_users

            }
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