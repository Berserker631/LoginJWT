import { DataTypes } from 'sequelize';
import sequelize from '../../db/connection';

export const Item = sequelize.define('menu', {
    idMenu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    menu_idMenu: {
        type: DataTypes.INTEGER
    },
    component_idComponent: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    displayName: {
        type: DataTypes.STRING,
    },
    path: {
        type: DataTypes.STRING,
    },
    isDisable: {
        type: DataTypes.BOOLEAN,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    },
    user_idUser_log: {
        type: DataTypes.INTEGER,
    },
    dateLog: {
        type: DataTypes.DATE,
    }
}, {freezeTableName: true, timestamps: false});
