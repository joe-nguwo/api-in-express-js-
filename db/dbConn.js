import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config()
const database = process.env.DB
const password = process.env.PASSWORD

export const sequelize = new Sequelize(database,"postgres",password,{
    host:"localhost",
    dialect:"postgres",
    port:5432
})

export async function conn () {

    try {
       sequelize.authenticate()
       return true 
    

    } catch (error) {
        
        return error






        
        
    }
    
}


