import { baseApi } from "@/redux/api/baseApi";

export const participantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantByToken: builder.query({
      query: (token) => `/participants/token/${token}`,
    }),
  }),
});

export const { useGetParticipantByTokenQuery } = participantApi;
