import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const Employee = sequelize.define('EmployeeHist', {
    IdEH: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    IdEmployee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{freezeTableName: true, deletedAt: false, updatedAt: false, createdAt: false})