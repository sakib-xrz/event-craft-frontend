import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params) => ({
        url: "/events",
        params,
      }),
      providesTags: [tagTypes.event],
    }),
    getJoinedEvents: builder.query({
      query: (params) => ({
        url: "/events/joined",
        params,
      }),
      providesTags: [tagTypes.event],
    }),
    getRequestedEvents: builder.query({
      query: (params) => ({
        url: "/events/requested",
        params,
      }),
      providesTags: [tagTypes.event],
    }),
    getFeaturedEvent: builder.query({
      query: () => "/events/featured",
      providesTags: [tagTypes.event],
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: [tagTypes.event],
    }),
    joinEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `/events/${eventId}/join`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetJoinedEventsQuery,
  useGetRequestedEventsQuery,
  useGetFeaturedEventQuery,
  useGetEventByIdQuery,
  useJoinEventMutation,
} = eventApi;
