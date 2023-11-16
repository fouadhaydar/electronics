"use client";
import AuthScreenStyle from "@/components/AuthScreenStyle";
import Image from "next/image";
import svg from "../../../public/assets/img-new-logo-low-quality.svg";
import { Form, Formik } from "formik";
import { InputAdornment, TextField } from "@mui/material";
import { logInValidation } from "../../validationShema";
import { LogInValues } from "@/types";
import { FormEvent, useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import Link from "next/link";
import Nav from "@/components/navBar/Nav";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/redux/features/auth/userSlice";
import { useRouter } from "next/navigation";
import useRefreshToken from "@/hooks/useRefreshToken";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues: LogInValues = {
    email: "",
    password: "",
  };
  const helperTextStyle = {
    ".MuiFormHelperText-contained": {
      marginY: "12px",
      marginX: 0,
    },
  };
  // const [user, setUser] = useState("");
  // const [pwd, setPwd] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  const refresh = useRefreshToken();

  const handlePssword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (values: LogInValues) => {
    // const { signal } = new AbortController()
    try {
      const response = await axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://192.168.1.11:5148/api/user/login",
        data: JSON.stringify(values),
        // withCredentials: true,
      });
      // const res = await axiosPrivate.post("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("error");
  return (
    <>
      <Nav bgColor="bg-gray-100" />
      <section className="h-[100vh]">
        <div className="flex justify-center items-center w-full h-full">
          <AuthScreenStyle />
          <div className="md:w-[70%] xsm:w-full">
            <div className="form_postion">
              <h2 className="text-2xl font-bold">Log In To Your account</h2>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values) => handleSubmit(values)}
                validationSchema={logInValidation}
              >
                {({
                  handleBlur,
                  handleChange,
                  errors,
                  touched,
                  values,
                  isSubmitting,
                }) => {
                  return (
                    <Form className="flex flex-col gap-5 w-full items-end">
                      <TextField
                        required
                        placeholder="first.last@subdomain.example.net"
                        className="w-full"
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={!!errors.email && touched.email}
                        helperText={touched.email && errors.email}
                        sx={{
                          ...helperTextStyle,
                        }}
                      />
                      <TextField
                        required
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        className="w-full"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        error={!!errors.password && touched.password}
                        helperText={
                          (touched.password && errors.password) ||
                          "Your password must be at least 8 characters"
                        }
                        name="password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {" "}
                              {showPassword ? (
                                <EyeFill
                                  width={20}
                                  height={20}
                                  color="gray"
                                  onClick={handlePssword}
                                />
                              ) : (
                                <EyeSlashFill
                                  width={20}
                                  height={20}
                                  color="gray"
                                  onClick={handlePssword}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          ...helperTextStyle,
                        }}
                      />
                      <div className="flex xsm:flex-col md:flex-row justify-between w-full items-cente gap-2">
                        <Link href={"/sign-up"} className="text-center">
                          <span className="text-blue-500">
                            Sign up if you dont have an account yet
                          </span>
                        </Link>
                        <button
                          type="submit"
                          className="submit_btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting ..." : "Submit"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <button
                onClick={async () => {
                  const newAccessToken = await refresh();
                  console.log(newAccessToken);
                }}
              >
                refresh token
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
