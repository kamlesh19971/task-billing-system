const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, default: "", required: true },
    price: { type: Number, default: 1, required: true },
    soldQuantity: { type: Number, default: 0, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const model = mongoose.model("items", schema);

module.exports = model;
