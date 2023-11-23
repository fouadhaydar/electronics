"use client";
import AuthScreenStyle from "@/app/(auth)/components/AuthScreenStyle";
import Image from "next/image";
import { Form, Formik, FormikHelpers } from "formik";
import { InputAdornment, TextField } from "@mui/material";
import { logInValidation } from "../../validation/validationShema";
import { LogInValues } from "@/types";
import { useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import Link from "next/link";
import Nav from "@/components/navBar/Nav";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/redux/features/auth/userSlice";
import { useRouter } from "next/navigation";
import google from "../../../../public/assets/iconfinder_Google_1298745 1.png";
import { axiosAuth } from "../api/axiosAuth";
import Submit from "../components/Submit";
import AlertComponent from "../components/AlertComponent";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

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

  const handlePssword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (
    values: LogInValues,
    { setValues, setTouched }: FormikHelpers<LogInValues>
  ) => {
    const controller = new AbortController();
    try {
      const response = await axiosAuth({
        url: "/user/login",
        signal: controller.signal,
        data: JSON.stringify(values),
      });
      dispatch(
        setUserCredentials({
          email: values.email,
          token: response.data.token,
        })
      );
      controller.abort();
      setValues({ email: "", password: "" });
      setTouched({ email: false, password: false });
      router.back();
    } catch (error) {
      setErrorMessage("This Account Dose Not existe");
    }
  };
  return (
    <>
      <Nav bgColor="bg-white" />
      <section className="h-[100vh] container">
        <div className="flex justify-center gap-5  items-center w-full h-full">
          <AuthScreenStyle />
          <div className="md:w-[70%] xsm:w-full">
            <div className="form_postion">
              <h2 className="text-2xl font-bold">Log In To Your account</h2>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
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
                    <>
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

                        <div className="w-full flex justify-between items-center">
                          <Link href={"/sign-up"}>
                            <span className="text-blue-500">
                              Forget Password ?
                            </span>
                          </Link>
                        </div>
                        <div className="flex xsm:flex-col md:flex-row justify-between w-full items-cente gap-2">
                          <button className="bg-black flex-1 text-white rounded-[5px] p-[10px] flex items-center justify-center gap-2">
                            <Image
                              src={google}
                              width={20}
                              height={20}
                              alt="G"
                            />
                            <span>sign-in with google</span>
                          </button>
                          <Submit text="Log In" disabled={isSubmitting} />
                        </div>
                      </Form>
                      <Link href={"/sign-up"} className="text-center">
                        <span className="text-blue-500">
                          Create New Account
                        </span>
                      </Link>
                    </>
                  );
                }}
              </Formik>
              {errorMessage && (
                <AlertComponent
                  text="Create new Account"
                  errorMessage={errorMessage}
                  logIn={true}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
