import mongoose, { Schema, model, models } from "mongoose";
import type { ProductCategory } from "@/types";

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  createdAt: Date;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["keyboards", "mice", "headsets", "controllers", "accessories"],
    },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Product =
  (models.Product as mongoose.Model<ProductDocument>) ||
  model<ProductDocument>("Product", ProductSchema);

export default Product;
