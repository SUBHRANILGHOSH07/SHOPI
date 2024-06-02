const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);//this will return the updated order
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");//this will return a message if the order is deleted
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });//this will find the order by the user id
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();//this will get the current date
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));//this will get the last month
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));//this will get the previous month

  try {
    const income = await Order.aggregate([//this will get the income
      { $match: { createdAt: { $gte: previousMonth } } },//this will match the order by the created date
      {
        $project: {
          month: { $month: "$createdAt" },//this will get the month of the created date
          sales: "$amount",//this will get the amount of the order
        },
      },
      {
        $group: {
          _id: "$month",//this will group the order by the month
          total: { $sum: "$sales" },//this will get the total sales
        },
      },
    ]);
    res.status(200).json(income);//this will return the income
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;