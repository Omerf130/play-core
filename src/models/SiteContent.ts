import mongoose, { Schema, model, models } from "mongoose";

export interface SiteContentDocument extends mongoose.Document {
  key: string;
  value: string;
  updatedAt: Date;
  createdAt: Date;
}

const SiteContentSchema = new Schema<SiteContentDocument>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

const SiteContent =
  (models.SiteContent as mongoose.Model<SiteContentDocument>) ||
  model<SiteContentDocument>("SiteContent", SiteContentSchema);

export default SiteContent;
