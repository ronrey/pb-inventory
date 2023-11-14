export interface IStatus {
  success: boolean;
  code: number;
  message: string;
}

export interface IPrice {
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

export interface IBlendCoffee {
  coffee_id: string;
  percentage: number;
}

export interface IBlend {
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
