// import {
//   FetchArgs,
//   FetchBaseQueryError,
//   createApi,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";
// import { setUserCredentials, logOut } from "../features/auth/userSlice";
// import { RootState } from "../store";
// import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
// import {
//   BaseQueryApi,
//   QueryReturnValue,
// } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

// export type BaseQueryFn<
//   Args = string,
//   Result = any,
//   Error = FetchBaseQueryError,
//   DefinitionExtraOptions = {},
//   Meta = {},
// > = (
//   args: Args,
//   api: BaseQueryApi,
//   extraOptions: DefinitionExtraOptions
// ) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;

// const baseQuery: BaseQueryFn = fetchBaseQuery({
//   baseUrl: "http://192.168.1.11:5148/api/user",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).user.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     console.log("sending refresh token");
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/refreshtoken", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const state = api.getState() as RootState;
//       const email = state.user.email;
//       // store the new token
//       api.dispatch(setUserCredentials({ ...refreshResult.data, email }));
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// });
