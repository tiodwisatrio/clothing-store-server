import { Sequelize } from 'sequelize';
const db = new Sequelize('clothing-store', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db;