export interface Category {
    id: number;
    name: string;
    parent_category_id: string;
    parent_category_name?:string;
    status: string;
    description: string;
    image?:string;
    ordering:number;
  }