"use client";
import { Alert, AlertTitle, InputAdornment, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useCallback, useId, useState } from "react";
import EyesComponent from "../components/EyesComponent";
import { axiosAuth } from "../api/axiosAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordValidation } from "@/app/validation/validationShema";
import AlertComponent from "../components/AlertComponent";
import axios from "axios";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const handlePssword = useCallback(() => setShowPassword((prev) => !prev), []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token")?.replaceAll(" ", "+");
  const uid = searchParams.get("uid");

  const initialValues = {
    password: "",
    confirmePassword: "",
  };

  const helperTextStyle = {
    ".MuiFormHelperText-contained": {
      marginY: "12px",
      marginX: 0,
    },
  };
  const handleSubmit = async (
    values: typeof initialValues,
    { setValues, setTouched }: FormikHelpers<typeof initialValues>
  ) => {
    setErrorMessage(null);
    setSuccessMessage(false);
    try {
      const resp = await axiosAuth({
        url: "user/resetpassword",
        withCredentials: false,
        data: JSON.stringify({
          userId: uid,
          token: token,
          newPassword: values.password,
        }),
      });
      setSuccessMessage(true);
      setValues({ password: "", confirmePassword: "" });
      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error) {
      setErrorMessage("Something goes wrong ");
    }
  };
  return (
    <section className="container min-h-[100vh] flex flex-col justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={resetPasswordValidation}
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
              <Form className="flex flex-col w-3/4 mx-auto gap-4">
                <TextField
                  required
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  onBlur={handleBlur}
                  className="w-full"
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
                        <EyesComponent
                          handlePssword={handlePssword}
                          showPassword={showPassword}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ...helperTextStyle,
                  }}
                />
                <TextField
                  required
                  label="Confirme Password"
                  variant="outlined"
                  name="confirmePassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme Password"
                  className="w-full"
                  value={values.confirmePassword}
                  error={!!errors.confirmePassword && touched.confirmePassword}
                  helperText={
                    (touched.confirmePassword && errors.confirmePassword) ||
                    "confirme password and password should be the same"
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{
                    ...helperTextStyle,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EyesComponent
                          handlePssword={handlePssword}
                          showPassword={showPassword}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <Submit text="Reset Password" disabled={isSubmitting} /> */}
                <button
                  className="text-white bg-blue-500 w-full py-4 rounded-md"
                  type="submit"
                >
                  reset password
                </button>
              </Form>
            </>
          );
        }}
      </Formik>
      <div className="w-3/4 my-6 mx-auto">
        {errorMessage && (
          <AlertComponent
            text={"Please Try Again"}
            errorMessage={errorMessage}
            logIn={null}
          />
        )}
        {successMessage && (
          <Alert
            severity="success"
            className="w-full p-4 rounded-md items-start min-h-full"
          >
            <AlertTitle className="font-bold">Success</AlertTitle>
            Password was reset successfully
          </Alert>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
