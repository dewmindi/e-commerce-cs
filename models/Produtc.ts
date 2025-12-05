// models/Product.ts
import { PackageCategory } from '@/types/quoate';
import mongoose from 'mongoose';


export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  category: PackageCategory;
  inStock: number;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true }, // Add index for category lookup
  inStock: { type: Number, required: true },
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema);