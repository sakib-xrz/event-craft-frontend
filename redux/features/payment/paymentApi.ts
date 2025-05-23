import { baseApi } from "@/redux/api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: `/payment/intent`,
        method: "POST",
        body: data,
      }),
    }),
    getPaymentDetails: builder.query({
      query: (id) => ({
        url: `/payment/details/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useGetPaymentDetailsQuery } =
  paymentApi;
