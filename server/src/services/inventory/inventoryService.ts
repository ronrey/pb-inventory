import { Coffee, Blend } from "./inventoryModel";
import { Document } from "mongoose";
import "../db"; // This will initialize the database connection

interface CoffeeDocument extends Document {
  // Add properties that match your Coffee schema
}

interface BlendDocument extends Document {
  // Add properties that match your Blend schema
}

class InventoryService {
  async getCoffees(): Promise<CoffeeDocument[]> {
    return await Coffee.find({});
  }

  async getCoffee(id: string): Promise<CoffeeDocument | null> {
    return await Coffee.findById(id);
  }

  async getBlends(): Promise<BlendDocument[]> {
    return await Blend.find({});
  }

  async getBlend(id: string): Promise<BlendDocument | null> {
    return await Blend.findById(id);
  }

  async addCoffee(coffeeData: any): Promise<CoffeeDocument> {
    const coffee = new Coffee(coffeeData);
    return await coffee.save();
  }

  async updateCoffee(
    id: string,
    coffeeData: any
  ): Promise<CoffeeDocument | null> {
    return await Coffee.findByIdAndUpdate(id, coffeeData, { new: true });
  }

  async deleteCoffee(id: string): Promise<CoffeeDocument | null> {
    return await Coffee.findByIdAndDelete(id);
  }

  async addBlend(blendData: any): Promise<BlendDocument> {
    const blend = new Blend(blendData);
    return await blend.save();
  }

  async updateBlend(id: string, blendData: any): Promise<BlendDocument | null> {
    return await Blend.findByIdAndUpdate(id, blendData, { new: true });
  }

  async deleteBlend(id: string): Promise<BlendDocument | null> {
    return await Blend.findByIdAndDelete(id);
  }
}

export default new InventoryService();
