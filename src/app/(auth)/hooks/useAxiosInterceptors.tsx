import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelectore } from "@/redux/store";
import { axiosAuth } from "../api/axiosAuth";
import { AxiosError, AxiosRequestConfig, AxiosResponseHeaders } from "axios";

const useAxiosInterceptors = () => {
  const refresh = useRefreshToken();
  const token = useSelectore((state) => state.user.token);

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosAuth.interceptors.response.use(
      (response) => {
        return response;
      },

      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const response = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${response?.token}`;
          const oldData = JSON.parse(prevRequest.data);

          if (
            prevRequest.url === "/product/postreview" ||
            prevRequest.url == "/product/getproductreview"
          ) {
            console.log(response?.email);
            prevRequest.data = JSON.stringify({
              ...oldData,
              email: response?.email,
            });
          }
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
      axiosAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh]);
  return axiosAuth;
};

export default useAxiosInterceptors;
