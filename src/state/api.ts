import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
  GetItemsResponse,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions", "Items"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
    getItems: build.query<Array<GetItemsResponse>, void>({
      query: () => "item/items/",
      providesTags: ["Items"],
    }),
    addItem: build.mutation<GetItemsResponse, Partial<GetItemsResponse>>({
      query: (body) => ({ url: "item/items/", method: "PUT", body }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: build.mutation<GetItemsResponse, Partial<GetItemsResponse>>({
      query: (body) => ({ url: "item/items/", method: "DELETE", body }),
      invalidatesTags: ["Items"],
    }),
    updateItem: build.mutation<GetItemsResponse, Partial<GetItemsResponse>>({
      query: (body) => ({ url: "item/items/", method: "POST", body }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = api;
