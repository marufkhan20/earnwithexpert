import { apiSlice } from "../api/apiSlice";

export const depositApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeposits: builder.query({
      query: () => `/api/deposits`,
    }),
    createDeposit: builder.mutation({
      query: (data) => ({
        url: `/api/deposits`,
        method: "POST",
        body: data,
      }),
    }),
    approveDeposit: builder.mutation({
      query: (id) => ({
        url: `/api/deposits/approve/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetDepositsQuery,
  useCreateDepositMutation,
  useApproveDepositMutation,
} = depositApi;
