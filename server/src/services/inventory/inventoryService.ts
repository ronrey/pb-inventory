import { Coffee, Blend, IBlend, ICoffee } from "./inventoryModel";
import { Document } from "mongoose";
import "../db"; // This will initialize the database connection

class InventoryService {
  async getCoffees(): Promise<ICoffee[]> {
    return await Coffee.find({});
  }

  async getCoffee(id: string): Promise<ICoffee | null> {
    return await Coffee.findById(id);
  }

  async getBlends(): Promise<IBlend[]> {
    return await Blend.find({});
  }

  async getBlend(id: string): Promise<IBlend | null> {
    return await Blend.findById(id);
  }

  async addCoffee(coffeeData: any): Promise<ICoffee> {
    const coffee = new Coffee(coffeeData);
    return await coffee.save();
  }

  async updateCoffee(item: any): Promise<ICoffee | null> {
    const { _id } = item;
    delete item._id;
    item.modifiedAt = new Date();
    return await Coffee.findByIdAndUpdate(_id, item, { new: true });
  }

  async deleteCoffee(id: string): Promise<ICoffee | null> {
    return await Coffee.findByIdAndDelete(id);
  }

  async addBlend(blendData: any): Promise<IBlend> {
    const blend = new Blend(blendData);
    return await blend.save();
  }

  async updateBlend(item: any): Promise<IBlend | null> {
    const { _id } = item;
    delete item._id;
    item.modifiedAt = new Date();
    return await Blend.findByIdAndUpdate(_id, item, { new: true });
  }

  async deleteBlend(id: string): Promise<IBlend | null> {
    return await Blend.findByIdAndDelete(id);
  }
}

export default new InventoryService();
