import { Sequelize } from "sequelize";

const sequelize = new Sequelize('pro_security_hickory', 'dev_ner', 'pK2QXJ6zvBT&', 
{
    host: '192.168.10.38',
    dialect: 'mssql',
    schema: 'security',
    pool: {
        max: 10,
        min: 0,
        idle: 1000,
    },
    logging: false,
});

export default sequelize