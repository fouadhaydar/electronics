"use client";
import { useEffect, useState } from "react";
import { axiosFetch } from "./api/axiosFetch";
import { AxiosError } from "axios";

// export const useCategories = () => {
//   const [categories, setCategories] = useState<
//     { id: string; categoryName: string; products: null }[]
//   >([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>();

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;
//     setIsLoading(true);

//     const getAllCategories = async () => {
//       try {
//         const res = await axiosCustome.get("/category/getallcategory", {
//           signal,
//           withCredentials: true,
//         });
//         if (res.status == 200) setCategories(() => [...res.data]);
//       } catch (error) {
//         const err = error as AxiosError;
//         if (err.response) {
//           setError(
//             "An error occurred while processing your request. Please try again later."
//           );
//         } else if (err.request) {
//           setError(
//             "Unable to connect to the server. Please check your internet connection"
//           );
//         } else {
//           setError("An unexpected error occurred. Please try again later.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getAllCategories();

//     return () => {
//       controller.abort();
//     };
//   }, []);
//   return { isLoading, categories, error };
// };

// { id: string; categoryName: string; products: null }[]

export function useCustomeFetch<T>(path: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        const res = await axiosFetch.get(path, {
          signal,
        });
        if (res.status == 200) setData(res.data);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          setError(
            "An error occurred while processing your request. Please try again later."
          );
        } else if (err.request) {
          setError(
            "Unable to connect to the server. Please check your internet connection"
          );
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // const time = setTimeout(() => getData(), 2000);
    getData();

    return () => {
      controller.abort();
      // clearTimeout(time);
    };
  }, [path]);
  return { isLoading, data, error };
}

export default useCustomeFetch;
