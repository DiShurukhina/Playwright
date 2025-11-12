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


export interface ICreatedOn {
  createdOn: string;
}

export interface IProductInTable extends Pick<IProduct, "name" | "manufacturer" | "price">, ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}