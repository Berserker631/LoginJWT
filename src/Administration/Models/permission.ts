import { DataTypes } from "sequelize";
import sequelize from "../../db/connection";

export const permission = sequelize.define('permission',
{
    idPermission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission_idPermission: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    user_idUser_log: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateLog: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {freezeTableName: true, deletedAt: false, updatedAt: false, createdAt: false})