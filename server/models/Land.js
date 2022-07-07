const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    default: "0",
  },
  type: {
    type: String,
    required: true,
  },
  rowIndex: {
        type: Number,
        required: true
    },

  colIndex: {
      type: Number,
      required: true
  },
  cost: {
    type: Number,
    default: 50,
  },
  game: {
    type: String,
    default: "",
  },
  isForSale: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Land", landSchema);