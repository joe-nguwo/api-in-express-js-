import { Customers } from "../models/customers.js";
import { Op } from "sequelize";
import redisConnect from "../db/redisConn.js";

const getUsers = async (req, res) => {
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
}

export default getUsers