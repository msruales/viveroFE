import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const MyFetchBaseQuery = () =>
    fetchBaseQuery({
        baseUrl: "http://viverobe.test/api/",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as any).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    })
