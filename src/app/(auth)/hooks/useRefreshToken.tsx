import { setUserCredentials } from "@/redux/features/auth/userSlice";
import { useDispatch } from "react-redux";
import { axiosAuth } from "../api/axiosAuth";

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
      return { token: response.data.token, email: response.data.email };
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
