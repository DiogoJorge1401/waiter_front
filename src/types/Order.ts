export type Product = {
  name: string;
  imagePath: string;
  price: number;
};

export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    product: Product;
    _id: string;
    quantity: number;
  }[];
}
