import { IResponseFields } from "./core.types";
import { ICustomer } from "./customer.types";
import { IProduct } from "./product.types";

export interface IMetricsResponse extends IResponseFields{
    Metrics: IMetrics;
}

// ORDERS
export interface IMetrics {
    orders: IOrdersMetrics;
    customers: ICustomersMetrics;
    products: IProductsMetrics;
}

export interface IOrdersMetrics {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalCanceledOrders: number;
    recentOrders: IRecentOrder[];
    ordersCountPerDay: IOrdersCountPerDay[];
}

export interface IRecentOrder {
    _id: string;
    status: string;
    customer: ICustomer;
    products: IProduct[];
    delivery: any;
    total_price: number;
    createdOn: string;
    comments: any[];
    history: any;
    assignedManager: any;
}

export interface IOrdersCountPerDay {
    date: IOrderDate;
    count: number;
}

export interface IOrderDate {
    day: number;
    month: number;
    year: number;
}

// CUSTOMERS


export interface ICustomersMetrics {
    totalNewCustomers: number;
    topCustomers: ITopCustomer[];
    customerGrowth: ICustomerGrowth[];
}

export interface ITopCustomer {
    _id: string;
    totalSpent: number;
    ordersCount: number;
    customerName: string;
    customerEmail: string;
}

export interface ICustomerGrowth {
    date: IOrderDate;
    count: number;
}

// PRODUCTS
export interface IProductsMetrics {
    topProducts: ITopProduct[];
}

export interface ITopProduct {
    name: string;
    sales: number;
}
