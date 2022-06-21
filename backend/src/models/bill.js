const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    billNumber: { type: String, default: "", required: true },
    amount: { type: Number, default: 1, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const model = mongoose.model("bills", schema);

module.exports = model;
