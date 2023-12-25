import mongoose, { Schema, Document } from "mongoose";

interface IPrice {
  measurement: string;
  quantity: number;
  price: number;
}

export interface ICoffee extends Document {
  state: string;
  key: number;
  decaf: boolean;
  createdAt: Date;
  modifiedAt?: Date;
  prices: IPrice[];
  mouthfeel: number;
  acidity: number;
  caramel: number;
  fruit: number;
  flower: number;
  flavors: string[];
  qualities: string[];
  region: string;
  roast: string;
  paragraphs: string[];
}

interface IBlendCoffee {
  coffee_id: mongoose.Types.ObjectId;
  percentage: number;
}

export interface IBlend extends Document {
  state: string;
  decaf: boolean;
  name: string;
  createdAt: Date;
  modifiedAt?: Date;
  prices: IPrice[];
  coffees: IBlendCoffee[];
  mouthfeel: number;
  acidity: number;
  caramel: number;
  fruit: number;
  flower: number;
  flavors: string[];
  qualities: string[];
  paragraphs: string[];
}

const PriceSchema = new Schema<IPrice>({
  measurement: String,
  quantity: Number,
  price: Number,
});

const CoffeeSchema = new Schema<ICoffee>({
  state: String,
  key: Number,
  decaf: Boolean,
  createdAt: { type: Date, default: Date.now, immutable: true },
  modifiedAt: { type: Date, required: false },
  prices: [PriceSchema],
  mouthfeel: Number,
  acidity: Number,
  caramel: Number,
  fruit: Number,
  flower: Number,
  flavors: [String],
  qualities: [String],
  region: String,
  roast: String,
  paragraphs: [String],
});

const BlendCoffeeSchema = new Schema<IBlendCoffee>({
  coffee_id: mongoose.Schema.Types.ObjectId,
  percentage: Number,
});

const BlendSchema = new Schema<IBlend>({
  state: String,
  decaf: Boolean,
  name: String,
  createdAt: { type: Date, default: Date.now, immutable: true },
  modifiedAt: { type: Date, required: false },
  prices: [PriceSchema],
  coffees: [BlendCoffeeSchema],
  mouthfeel: Number,
  acidity: Number,
  caramel: Number,
  fruit: Number,
  flower: Number,
  flavors: [String],
  qualities: [String],
  paragraphs: [String],
});

const Coffee = mongoose.model<ICoffee>("Coffee", CoffeeSchema);
const Blend = mongoose.model<IBlend>("Blend", BlendSchema);

export { Coffee, Blend };
