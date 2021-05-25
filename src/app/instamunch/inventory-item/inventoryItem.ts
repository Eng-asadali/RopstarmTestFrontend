export interface Item{
    name  :String,
    description :String,
    price_per_unit:Number,
    quantity: Number,
    cost:Number,
    category?: String,
    category_id: String,
    vendor:String,
    vendor_id:String,
    status:String,
    item_file: String
}