export interface Product {
  nutrition:string;
  allergens:string;
  isavailable:boolean;
  kitchen_status:boolean;
    id: number;
    name: string;
    kitchen_id: number,
    category_id : number;
    status: string;
    detail: string;
    price: number;
    image?: string;
    is_tax_included: boolean;
    estimated_prepare_time?: string;
    product_attributes: string;
    ordering:number;
  }