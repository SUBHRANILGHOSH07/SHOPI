const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");// this will import the verifyToken, verifyTokenAndAuthorization, and verifyTokenAndAdmin functions from the verifyToken.js file

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);//this will create a new cart with the user id and the products

  try {
    const savedCart = await newCart.save();//this will save the new cart to the database
    res.status(200).json(savedCart);//this will return the saved cart
  } catch (err) {
    res.status(500).json(err);//this will return an error message if the cart is not saved
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,//this will update the cart by the id
      {
        $set: req.body,//this will set the new products in the cart
      },
      { new: true }//this will return the updated cart
    );
    res.status(200).json(updatedCart);//this will return the updated cart
  } catch (err) {
    res.status(500).json(err);//this will return an error message if the cart is not updated
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);//this will delete the cart by the id
    res.status(200).json("Cart has been deleted...");//this will return a message if the cart is deleted
  } catch (err) {
    res.status(500).json(err);//this will return an error message if the cart is not deleted
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });//this will find the cart by the user id
    res.status(200).json(cart);//this will return the cart
  } catch (err) {
    res.status(500).json(err);//this will return an error message if the cart is not found
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();//this will find all the carts
    res.status(200).json(carts);//this will return all the carts
  } catch (err) {
    res.status(500).json(err);//this will return an error message if the carts are not found
  }
});

module.exports = router;