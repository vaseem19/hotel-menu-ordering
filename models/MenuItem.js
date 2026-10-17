import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["Starter", "Main Course", "Dessert", "Beverage"],
    default: "Main Course",
  },
  image: {
    type: String, // URL of the image
  },
}, { timestamps: true });

// Fix OverwriteModelError
const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
