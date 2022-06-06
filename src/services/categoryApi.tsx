import {createApi} from "@reduxjs/toolkit/query/react";
import {MyFetchBaseQuery} from "../helpers/MyfetchBaseQuery";
import {ProductAdapter} from "../pages/Product/adapter/product.adapter";
import {paginationAdapter} from "../adapters/pagination.adapter";
import {categoryAdapter} from "../pages/Category/adapter/category.adapter";


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: MyFetchBaseQuery(),
    endpoints: builder => ({
        getCategoryList: builder.query({
            query: ({page = 1, search = '', perPage = 10}) => ({
                url: `dashboard/categories`,
                params: {
                    page,
                    search,
                    perPage
                }
            }),
            transformResponse: ({data}: { data: any }) => {
                const {pagination: paginationIn, categories: categoriesIn} = data
                return {
                    products: categoriesIn ? categoriesIn.map((category: object) => categoryAdapter(category)) : [],
                    pagination: paginationAdapter(paginationIn)
                }
            },
        }),
        getCategoriesSelect: builder.query({
            query: () => ({
                url: `dashboard/categories/select/categories`,
            }),
            transformResponse: ({data}: { data: any }) => {
                const {categories: categoriesIn} = data
                return categoriesIn ? categoriesIn.map((category: object) => categoryAdapter(category)) : []
            },
        }),
    }),
})

export const {useGetCategoryListQuery, useGetCategoriesSelectQuery} = categoryApi
