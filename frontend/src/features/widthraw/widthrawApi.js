import { apiSlice } from "../api/apiSlice";

export const widthrawApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWidthraws: builder.query({
      query: () => `/api/widthraws`,
    }),
    createWidthraw: builder.mutation({
      query: (data) => ({
        url: `/api/widthraws`,
        method: "POST",
        body: data,
      }),
    }),
    approveWidthraw: builder.mutation({
      query: (id) => ({
        url: `/api/widthraws/approve/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetWidthrawsQuery,
  useCreateWidthrawMutation,
  useApproveWidthrawMutation,
} = widthrawApi;
