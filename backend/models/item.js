import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  rating: {
    rate: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
  discount: {
    type: Number,
    default: 0,
  },
});

export default model("Item", schema, "products");
