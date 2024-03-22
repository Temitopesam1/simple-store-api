import mongoose, { Schema, Document } from 'mongoose';
const ObjectID = mongoose.Schema.Types.ObjectId


export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  creator: mongoose.Schema.Types.ObjectId
}

const ProductSchema: Schema = new Schema({
  creator : {
    type: ObjectID,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true
  },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
