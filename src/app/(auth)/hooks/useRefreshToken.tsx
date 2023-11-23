import { setUserCredentials } from "@/redux/features/auth/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { axiosAuth } from "../api/axiosAuth";
// import { cookies } from "next/headers";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const controller = new AbortController();
      const response = await axiosAuth({
        url: "/user/refreshtoken",
        signal: controller.signal,
      });
      dispatch(
        setUserCredentials({
          email: response.data.email,
          token: response.data.token,
        })
      );
      controller.abort();
      console.log(response.data.email);
      return { token: response.data.token, email: response.data.email };
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;

// fetch("http://192.168.1.9:5148/api/user/refreshtoken", {
//   credentials: 'include',
//   method: 'Post',
//   headers: {
//     "Content-Type": "application/json",
//   },
//   mode: 'cors'
// }).then(res => res.json()).then(data => console.log(data))
