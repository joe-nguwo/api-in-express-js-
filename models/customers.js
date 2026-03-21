import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConn.js";

export const Customers = sequelize.define("Customers",{

    id:{
        type:DataTypes.UUID,
        defaultValue:sequelize.UUID,
        primaryKey:true
    },
    Fname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Lname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

    }

})
