import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
import { ID, IResponseFields } from "./core.types";

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

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}