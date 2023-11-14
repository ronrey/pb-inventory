import InventoryService from "../services/inventory/inventoryService";
import { IStatus, ICoffee, IBlend } from "../types"; // Assuming these types are defined

export const Mutation = {
  addCoffee: async (_: any, { item }: { item: ICoffee }): Promise<IStatus> => {
    try {
      await InventoryService.addCoffee(item);
      return {
        success: true,
        code: 200,
        message: "Coffee added successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        code: 500,
        message: error.message || "An unknown error occurred",
      };
    }
  },

  updateCoffee: async (_: null, args: { item: any }): Promise<IStatus> => {
    try {
      const coffee = await InventoryService.updateCoffee(args.item);
      if (!coffee) {
        return {
          success: false,
          code: 500,
          message: "Coffee not found",
        };
      } else
        return {
          success: true,
          code: 200,
          message: "Coffee updated successfully",
        };
    } catch (error: any) {
      return {
        success: false,
        code: 500,
        message: error.message || "An unknown error occurred",
      };
    }
  },

  removeCoffee: async (_: any, { id }: { id: string }): Promise<IStatus> => {
    try {
      await InventoryService.deleteCoffee(id);
      return {
        success: true,
        code: 200,
        message: "Coffee removed successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        code: 500,
        message: error.message || "An unknown error occurred",
      };
    }
  },

  addBlend: async (_: any, { item }: { item: IBlend }): Promise<IStatus> => {
    try {
      await InventoryService.addBlend(item);
      return {
        success: true,
        code: 200,
        message: "Blend added successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        code: 500,
        message: error.message || "An unknown error occurred",
      };
    }
  },

  updateBlend: async (_: any, { item }: { item: IBlend }): Promise<IStatus> => {
    try {
      const blend = await InventoryService.updateBlend(item);
      if (!blend) {
        return {
          success: false,
          code: 500,
          message: "Blend not found",
        };
      } else
        return {
          success: true,
          code: 200,
          message: "Blend updated successfully",
        };
    } catch (error: any) {
      return {
        success: false,
        code: 500,
        message: error.message || "An unknown error occurred",
      };
    }
  },

  removeBlend: async (_: any, { id }: { id: string }): Promise<IStatus> => {
    try {
      await InventoryService.deleteBlend(id);
      return {
        success: true,
        code: 200,
        message: "Blend removed successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        code: 500,
        message: error.message || "An unknown error occurred",
      };
    }
  },

  // Further mutations can be added here as needed
};

export default Mutation;
