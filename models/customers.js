import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConn.js";

export const Customers = sequelize.define("Customers", {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },

    Fname:{
        type: DataTypes.STRING,
        allowNull:false
    },

    Lname:{
        type: DataTypes.STRING,
        allowNull:false
    },

    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },

    phone:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    dateOfBirth:{
        type: DataTypes.DATEONLY
    },

    gender:{
        type: DataTypes.ENUM("male","female","other")
    },

    address:{
        type: DataTypes.STRING
    },

    city:{
        type: DataTypes.STRING
    },

    country:{
        type: DataTypes.STRING,
        defaultValue:"Zambia"
    },

    postalCode:{
        type: DataTypes.STRING
    },

    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    },

    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});