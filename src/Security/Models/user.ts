import { DataTypes } from 'sequelize';
import sequelize from '../../db/connection'

export const User = sequelize.define('user', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key2FA: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language_idLanguage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    user_idUser_log: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},{freezeTableName: true, createdAt: false, updatedAt: false});