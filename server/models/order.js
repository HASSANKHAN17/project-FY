const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    allProduct: [],
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentMode: {
      type: String,
      enum: [
        "ONLINE",
        "COD",
      ],
      require: true,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Out For Delivery",
      enum: [
        "Not processed",
        "Processing",
        "Return in Process",
        "Cancelled",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;

// {
//   name: 
//   price:
//   category:
//   image:
// }
