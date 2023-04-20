import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Carts = db.define("carts", {
  id_cart: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //   FOREIGN KEY WITH ID PRODUCT
  id_product: {
    type: DataTypes.INTEGER,
    references: {
      model: "product",
      key: "id_product",
    },
  },
});

export default Carts;

(async () => {
  await db.sync();
})();
