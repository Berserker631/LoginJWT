import { Sequelize } from "sequelize";

const sequelize = new Sequelize('jwt', 'sa', 'sa2023', {
    host: 'localhost',
    dialect: 'mssql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
})

export default sequelize