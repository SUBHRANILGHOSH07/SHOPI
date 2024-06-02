const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },//mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        productId: {
          type: String,//mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,//mongoose.Schema.Types.Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }// this will automatically add the createdAt and updatedAt fields in the database
);

module.exports = mongoose.model("Cart", CartSchema);// this will create a new collection in the database with the name of "carts" and the schema of CartSchema