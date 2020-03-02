export interface Product {
    id: number;
    name: string;
    kitchen_id: number,
    category_id : number;
    status: string;
    detail: string;
    price: number;
    image?: string;
    is_tax_included: boolean;
  }