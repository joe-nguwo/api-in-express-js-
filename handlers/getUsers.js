import { Customers } from "../models/customers.js";
import { Op } from "sequelize";
import redisConnect from "../db/redisConn.js";


const getUsers = async (req, res) => {
    const { search,page } = req.query;
    const limit = 20;
    const offset = (page - 1 )* limit 
    const CachKey = `users${page}`

    try {
        let users;
        let  total_users;
        const CachedData = await redisConnect.get(CachKey)
       

        if (search) {
            users = await Customers.findAll({
                where: {
                    Fname: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
            res.status(200).json({"data":users})
        }
        else if(CachedData){
            console.log("Cache hit");
            res.status(200).json(JSON.parse(CachedData))

        }
        
        else {
            console.log("Cache miss")
            users = await Customers.findAll({
                limit: limit,
                offset:offset,
            });
            await redisConnect.setEx(CachKey,3600,JSON.stringify(users))
            

            total_users = await Customers.count()
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


        }

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default getUsers