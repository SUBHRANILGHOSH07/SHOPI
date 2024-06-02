const mongoose = require("mongoose");// this will import the mongoose library

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },//mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },//mongoose.Schema.Types.Number, required: true },
    address: { type: Object, required: true },//mongoose.Schema.Types.Object, required: true },
    status: { type: String, default: "pending" },//mongoose.Schema.Types.String, default: "pending" },
  },
  { timestamps: true }//
);

module.exports = mongoose.model("Order", OrderSchema);// this will create a new collection in the database with the name of "orders" and the schema of OrderSchema