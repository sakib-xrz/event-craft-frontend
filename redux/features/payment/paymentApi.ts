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
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
