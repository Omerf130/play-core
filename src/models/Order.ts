import mongoose, { Schema, model, models } from "mongoose";

export interface OrderDocument extends mongoose.Document {
  products: {
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  paymentStatus: "pending" | "completed" | "failed";
  paypalOrderId?: string;
  createdAt: Date;
}

const OrderProductSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema = new Schema<OrderDocument>(
  {
    products: { type: [OrderProductSchema], required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paypalOrderId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order =
  (models.Order as mongoose.Model<OrderDocument>) ||
  model<OrderDocument>("Order", OrderSchema);

export default Order;
