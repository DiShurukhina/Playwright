import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export interface IProduct {
  name: string;
  price: number;
  manufacturer: MANUFACTURERS;
  amount: number;
  notes?: string;
}

export interface IProductTableRow {
  name: string;
  price: string;
  manufacturer: MANUFACTURERS;
}