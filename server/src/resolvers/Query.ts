import InventoryService from "../services/inventory/inventoryService";
import { ICoffee, IBlend } from "../types"; // Assuming these types are defined

export const Query = {
  totalCoffees: async () => {
    const coffees = await InventoryService.getCoffees();
    return coffees.length.toString();
  },

  totalBlends: async () => {
    const blends = await InventoryService.getBlends();
    return blends.length.toString();
  },

  getCoffee: async (_: any, { id }: { id: string }) => {
    return await InventoryService.getCoffee(id);
  },

  getCoffees: async () => {
    return await InventoryService.getCoffees();
  },

  getBlend: async (_: any, { id }: { id: string }) => {
    return await InventoryService.getBlend(id);
  },

  getBlends: async () => {
    return await InventoryService.getBlends();
  },

  // Additional resolvers for other queries can be added here
};

export default Query;
