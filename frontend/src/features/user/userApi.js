import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/api/users`,
      providesTags: ["getUsers"],
    }),
    getUser: builder.query({
      query: (id) => `/api/users/${id}`,
    }),
    updateProfilePic: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/users/update-profile-pic/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    playGame: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/users/play-game/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletedUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getUsers"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateProfilePicMutation,
  usePlayGameMutation,
  useDeletedUserMutation,
} = userApi;
