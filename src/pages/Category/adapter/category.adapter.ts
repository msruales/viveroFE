import {Category} from "../model/category.model";


export const categoryAdapter = (category: any): Category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    status: category.status
})
