import {Product} from "../model/product.model";

export const ProductAdapter = (product: any): Product => ({
    category: product.category,
    categoryId: product.category_id,
    description: product.description,
    id: product.id,
    name: product.name,
    price: product.price,
    status: product.status,
    stock: product.stock
})
