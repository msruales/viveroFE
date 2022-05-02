import {createApi} from "@reduxjs/toolkit/query/react";
import {MyFetchBaseQuery} from "../helpers/MyfetchBaseQuery";
import {ProductAdapter} from "../pages/Product/adapter/product.adapter";
import {paginationAdapter} from "../adapters/pagination.adapter";


export const categoryApi =  createApi({
    reducerPath: 'categoryApi',
    baseQuery: MyFetchBaseQuery(),
    endpoints: builder => ({
        getProductList: builder.query({
            query: ({page, search = ''}) => ({
                url: `dashboard/categories`,
                params: {
                    page,
                    search
                }
            }),
            transformResponse: ({data}: {data: any}) => {
                const {pagination: paginationIn, products: productsIn} = data
                return {
                    products: productsIn ? productsIn.map( (product: object) => ProductAdapter(product)) : [],
                    pagination: paginationAdapter(paginationIn)
                }
            },
        }),
    }),
})

export const { useGetProductListQuery } = categoryApi
