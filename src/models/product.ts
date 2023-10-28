import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'

export const Product = sequelize.define('products', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {freezeTableName: true, timestamps: false});