"use client";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import Link from "next/link";
import AuthScreenStyle from "@/app/(auth)/components/AuthScreenStyle";
import { signUpValidation } from "../../validation/validationShema";
import { SignUpValues } from "@/types";
import Nav from "@/components/navBar/Nav";
import axios from "axios";
import { useRouter } from "next/navigation";
import { axiosAuth } from "../api/axiosAuth";
import Submit from "../components/Submit";
import AlertComponent from "../components/AlertComponent";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const initialValues: SignUpValues = {
    userName: "",
    email: "",
    phoneNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
  };
  const helperTextStyle = {
    ".MuiFormHelperText-contained": {
      marginY: "12px",
      marginX: 0,
    },
  };
  const handlePssword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleFormSubmit = async (
    values: SignUpValues,
    { setTouched, setValues }: FormikHelpers<SignUpValues>
  ) => {
    const controller = new AbortController();
    try {
      await axiosAuth.post("/user/register", {
        signal: controller.signal,
        data: JSON.stringify(values),
      });
      setValues({ ...initialValues });
      setTouched({
        email: false,
        password: false,
        confirmPassword: false,
        country: false,
        userName: false,
        phoneNumber: false,
      });
      router.back();
    } catch (error) {
      setValues({ ...initialValues });
      setErrorMessage("Account already existe please try another one or ");
    }
  };
  return (
    <>
      <Nav bgColor="bg-white" />
      <section className="h-[100vh] xsm:pt-[70px] md:pt-0 lg:mx-[50px]">
        <div className="flex justify-center items-center w-full h-full">
          <AuthScreenStyle />
          <div className="md:w-[70%] xsm:w-full">
            <div className="form_postion">
              <h2 className="text-2xl font-bold">Create account</h2>

              <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={signUpValidation}
              >
                {({
                  isSubmitting,
                  errors,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                }) => {
                  return (
                    <Form className="flex flex-col gap-5 w-full items-end">
                      <div className="parent_sign_up_text_filed">
                        <TextField
                          required
                          label="User Name"
                          variant="outlined"
                          name="userName"
                          type="text"
                          placeholder="User Name"
                          className="sign_up_text_filed"
                          value={values.userName}
                          error={!!errors.userName && touched.userName}
                          helperText={touched.userName && errors.userName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            ...helperTextStyle,
                          }}
                        />
                        <TextField
                          required
                          label="Email"
                          variant="outlined"
                          name="email"
                          type="email"
                          placeholder="first.last@subdomain.example.net"
                          className="sign_up_text_filed"
                          value={values.email}
                          error={!!errors.email && touched.email}
                          helperText={touched.email && errors.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            ...helperTextStyle,
                          }}
                        />
                      </div>
                      <div className="parent_sign_up_text_filed">
                        <TextField
                          required
                          label="Phone Number"
                          variant="outlined"
                          name="phoneNumber"
                          type="text"
                          placeholder="Phone Number +44 7777 777 777"
                          className="sign_up_text_filed"
                          value={values.phoneNumber}
                          error={!!errors.phoneNumber && touched.phoneNumber}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <TextField
                          select
                          label="Country"
                          variant="outlined"
                          name="country"
                          type="text"
                          placeholder="Selecte Your Country"
                          className="sign_up_text_filed"
                          onChange={handleChange}
                          value={values.country}
                          error={!!errors.country && touched.country}
                          helperText={touched.country && errors.country}
                          onBlur={handleBlur}
                          sx={{
                            ...helperTextStyle,
                          }}
                        >
                          {["Lebanon", "Egypt", "Uk", "US", "UA", "Jorden"].map(
                            (country) => (
                              <MenuItem
                                className="px-2 py-1 hover:bg-blue-200"
                                value={country}
                                key={country}
                              >
                                {country}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      </div>
                      <div className="parent_sign_up_text_filed">
                        <TextField
                          required
                          label="Password"
                          variant="outlined"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="sign_up_text_filed"
                          value={values.password}
                          error={!!errors.password && touched.password}
                          helperText={
                            (touched.password && errors.password) ||
                            "Your password must be at least 8 characters"
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            ...helperTextStyle,
                          }}
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
                        />
                        <TextField
                          required
                          label="Confirme Password"
                          variant="outlined"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirme Password"
                          className="sign_up_text_filed"
                          value={values.confirmPassword}
                          error={
                            !!errors.confirmPassword && touched.confirmPassword
                          }
                          helperText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          sx={{
                            ...helperTextStyle,
                          }}
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
                        />
                      </div>
                      <div className="flex xsm:flex-col md:flex-row justify-between w-full items-center gap-2">
                        <Link href={"/log-in"} className="text-center flex-1">
                          <span className="text-blue-500">
                            Log In to your Existing account
                          </span>
                        </Link>
                        <Submit text="Sign Up" disabled={isSubmitting} />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              {errorMessage && (
                <AlertComponent
                  text="Log-In in your existing accout"
                  errorMessage={errorMessage}
                  logIn={false}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
