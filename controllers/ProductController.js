import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const saveProduct = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No file uploaded" });
  const name = req.body.title;
  const price = req.body.price;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedTypes = [".jpg", ".jpeg", ".png"];

  // Validasi file yang diupload
  if (!allowedTypes.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "File type not supported" });
  if (fileSize > 5000000)
    return res
      .status(422)
      .json({ msg: "File size too large, file must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create({
        name: name,
        price: price,
        image: fileName,
        url,
      });
      res.status(201).json({ msg: "Product created successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "Product not found" });
  let fileName = "";
  if (req.files === null) {
    fileName = Product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedTypes = [".jpg", ".jpeg", ".png"];

    // Validasi file yang diupload
    if (!allowedTypes.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "File type not supported" });
    if (fileSize > 5000000)
      return res
        .status(422)
        .json({ msg: "File size too large, file must be less than 5 MB" });

    // Mengapus image yang lama
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    // Upload image yang baru
    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const price = req.body.price;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Product.update(
      { name: name, price: price, image: fileName, url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(404).json({ msg: "Product not found" });
  try {
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};


