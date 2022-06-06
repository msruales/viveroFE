import {createApi} from "@reduxjs/toolkit/query/react";
import {MyFetchBaseQuery} from "../helpers/MyfetchBaseQuery";
import {ProductAdapter} from "../pages/Product/adapter/product.adapter";
import {paginationAdapter} from "../adapters/pagination.adapter";
import {Product} from "../pages/Product/model/product.model";


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: MyFetchBaseQuery(),
    tagTypes: ['Products'],
    endpoints: builder => ({
        getProductList: builder.query({
            query: ({page = 1, search = '', rowsPerPage = 10}) => ({
                url: `dashboard/products`,
                params: {
                    page,
                    search,
                    perPage: rowsPerPage
                }
            }),

            transformResponse: ({data}: { data: any }) => {
                const {pagination: paginationIn, products: productsIn} = data
                return {
                    products: productsIn ? productsIn.map((product: object) => ProductAdapter(product)) : [],
                    pagination: paginationAdapter(paginationIn)
                }
            },
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.products.map(({id}: Product) => ({type: 'Products', id} as const)),
                        {type: 'Products', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'Products', id: 'LIST'}],
        }),
        deleteProduct: builder.mutation({
            query: (id: string) => ({
                url: `dashboard/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => {
                console.log('result', result, 'id', id)
                return [{type: 'Products', id}]
            },
        }),
        addProduct: builder.mutation<Product, Partial<Product>>({
            query: (product) => ({
                url: `dashboard/products`,
                method: 'POST',
                body: {
                    ...product
                }
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}],
        }),
        updatePost: builder.mutation<Product, Partial<Product>>({
            query(product) {
                const {id, ...body} = product
                return {
                    url: `dashboard/products/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: (result, error, {id}) => {
                return [{type: 'Products', id}]
            }
        }),
    }),
})

export const {
    useGetProductListQuery,
    useDeleteProductMutation,
    useUpdatePostMutation,
    useAddProductMutation
} = productApi
