"use client";
import { InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
// import svg from '../../../public/assets/img-new-logo-low-quality.svg'
// import Image from "next/image";
import { useEffect, useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import Link from "next/link";
import AuthScreenStyle from "@/components/AuthScreenStyle";
import { signUpValidation } from "../../validationShema";
import { SignUpValues } from "@/types";
import Nav from "@/components/navBar/Nav";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const handleFormSubmit = async (values: SignUpValues) => {
    try {
      const res = await axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        // withCredentials: true,
        url: "http://192.168.1.11:5148/api/user/register",
        data: JSON.stringify(values),
      });
      router.push("/log-in");
    } catch (error) {
      setErrorMessage("Account already existe please try another one");
    }
  };
  useEffect(() => {
    if (errorMessage !== null) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);
  return (
    <>
      <Nav bgColor="bg-white" />
      <section className="h-[100vh] xsm:pt-[70px] md:pt-0">
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
                  handleSubmit,
                  values,
                  touched,
                }) => {
                  // console.log(isSubmitting);
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
                        <Link href={"/log-in"} className="text-center">
                          <span className="text-blue-500">
                            Log In to your Existing account
                          </span>
                        </Link>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="submit_btn"
                        >
                          {isSubmitting ? "Submitting ..." : "Submit"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              {errorMessage && (
                <Typography className="text-red-500">{errorMessage}</Typography>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
