import Carts from "../models/CartsModel.js";

export const getCarts = async (req, res) => {
  try {
    const response = await Carts.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const response = await Carts.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const saveCart = async (req, res) => {
  try {
    await Carts.create({
      quantity: req.body.quantity,
      id_product: req.body.id_product,
    });
    res.status(201).json({ msg: "Cart created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const response = await Carts.destroy({
      where: {
        id: req.params.id,
      },
    });
    response
      ? res.status(200).json({ msg: "Cart deleted successfully" })
      : res.status(404).json({ msg: "Cart not found" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCart = async (req, res) => {
  try {
    const response = await Carts.update(
      {
        quantity: req.body.quantity,
        id_product: req.body.id_product,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    response
      ? res.status(200).json({ msg: "Cart updated successfully" })
      : res.status(404).json({ msg: "Cart not found" });
  } catch (error) {
    console.log(error.message);
  }
};
