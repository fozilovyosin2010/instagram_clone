import { baseApi } from "@/src/shared/api/index";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (obj) => ({
        url: "/Account/login",
        method: "POST",
        body: obj,
      }),
    }),
    register: builder.mutation({
      query: (obj) => ({
        url: "/Account/register",
        method: "POST",
        body: obj,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
