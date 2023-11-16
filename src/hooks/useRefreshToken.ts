import {
  refreshToken,
  setUserCredentials,
} from "@/redux/features/auth/userSlice";
// import { useSelectore } from "@/redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
// import useAuth from './useAuth';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  //   const selector = useSelectore((state) => state.user);

  const refresh = async () => {
    const response = await axios({
      method: "Post",
      url: "http://192.168.1.11:5148/api/user/refreshtoken",
      // withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhZmUwMTBmLTQ0MzItNDI1OC05OGViLTEwY2I4NjczMjI1MyIsImVtYWlsIjoibmV3QWNjb3VudEBnbWFpbC5jb20iLCJzdWIiOiJuZXdBY2NvdW50QGdtYWlsLmNvbSIsImp0aSI6IjU4NmYxOTQ5LWE4MTQtNDY2NC1iMDdjLWQ2NzFkYzMwMjAwNyIsInJvbGUiOiJjbGllbnQiLCJuYmYiOjE3MDAwNDcyNDQsImV4cCI6MTcwMDIyMDA0NCwiaWF0IjoxNzAwMDQ3MjQ0fQ.62WJEk6NGmrIru7qJB6OBRTNCygCHQfMXerCSy4ISKs",
        refreshToken:
          "2V5ZYHWHEQCHD03XJST3JYNIHJ5LEOH357Zb5750a64-d585-4b60-885e-502c2b101002",
      }),
    });
    console.log(response);
    dispatch(refreshToken(response.data.accessToken));
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
