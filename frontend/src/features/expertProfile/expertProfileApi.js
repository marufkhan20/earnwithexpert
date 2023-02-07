import { apiSlice } from "../api/apiSlice";

export const expertProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpertProfiles: builder.query({
      query: () => `/api/expert-profiles`,
      providesTags: ["getExpertProfiles"],
    }),
    getAllHireExperts: builder.query({
      query: () => `/api/expert-profiles/hire-experts`,
    }),
    getAllHireExpertsByUser: builder.query({
      query: (id) => `/api/expert-profiles/hire-experts/${id}`,
    }),
    createExpertProfile: builder.mutation({
      query: (data) => ({
        url: `/api/expert-profiles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getExpertProfiles"],
    }),
    hireExpert: builder.mutation({
      query: (data) => ({
        url: `/api/expert-profiles/hire-expert`,
        method: "POST",
        body: data,
      }),
    }),
    updateHireExpertStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/expert-profiles/hire-expert/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetExpertProfilesQuery,
  useGetAllHireExpertsQuery,
  useGetAllHireExpertsByUserQuery,
  useCreateExpertProfileMutation,
  useHireExpertMutation,
  useUpdateHireExpertStatusMutation,
} = expertProfileApi;
