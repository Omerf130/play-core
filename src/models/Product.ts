import mongoose, { Schema, model, models } from "mongoose";
import type { ProductCategory } from "@/types";

export interface ProductDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  isPromoted: boolean;
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
      enum: ["keyboards", "mice", "headsets", "controllers", "accessories", "computers", "chairs"],
    },
    image: { type: String, default: "" },
    isPromoted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product =
  (models.Product as mongoose.Model<ProductDocument>) ||
  model<ProductDocument>("Product", ProductSchema);

export default Product;
