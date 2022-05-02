import {Category} from "../../../models/category.model";

export interface Product {
    category: Category,
    categoryId: string,
    description: string,
    id: string,
    name: string,
    price: number,
    status: "disabled" | "activated",
    stock: number
}
