import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import ProductRoute from "./routes/ProductRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import CartsRoute from "./routes/CartsRoute.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
app.use(AdminRoute);
app.use(CartsRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
