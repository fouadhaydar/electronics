"use client";
import useAxiosInterceptors from "@/app/(auth)/hooks/useAxiosInterceptors";
import { setUserCredentials } from "@/redux/features/auth/userSlice";
import { useSelectore } from "@/redux/store";
import { useDispatch } from "react-redux";

const useSetToken = () => {
  const dispatch = useDispatch();
  const axiosInterceptors = useAxiosInterceptors();
  const token = useSelectore((state) => state.user.token);

  const setToken = () => {
    // return new Promise((resolve, reject) => {
    //   if (!token) {
    //     const controller = new AbortController();
    //     const userAth = async () => {
    //       try {
    //         const res = await axiosInterceptors.post("/refreshtoken", {
    //           signal: controller.signal,
    //         });
    //         console.log(res.data.token);
    //         dispatch(
    //           setUserCredentials({
    //             email: "",
    //             token: res.data.token,
    //           })
    //         );
    //         resolve(200);
    //       } catch (err) {
    //         reject(500);
    //       }
    //     };
    //     userAth();
    //     return () => {
    //       controller.abort();
    //     };
    //   } else resolve(300);
    // });
  };
  return { setToken };
};

export default useSetToken;
