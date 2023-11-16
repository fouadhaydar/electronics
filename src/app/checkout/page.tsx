"use client";
import Nav from "@/components/navBar/Nav";
import { CheckoutValues } from "@/types";
import { billingValidation } from "@/validationShema";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { ArrowRightShort } from "react-bootstrap-icons";

const Checkout = () => {
  const initialValues: CheckoutValues = {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    zipCode: "",
    streetAddress: "",
    phoneNumber: "",
  };
  const helperTextStyle = {
    ".MuiFormHelperText-contained": {
      marginY: "12px",
      marginX: 0,
    },
  };
  // const handleClick = => {

  // };
  return (
    <>
      <Nav bgColor="bg-white" />
      <section className="container min-h-[100vh] flex flex-col gap-10 justify-center">
        <h2 className="text-2xl font-bold">Billing Information</h2>
        <div className="h-full flex flex-col justify-center">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, errors) => {
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={billingValidation}
          >
            {({ handleChange, handleBlur, errors, values, touched }) => {
              return (
                <Form className="flex flex-col gap-5 items-end">
                  <div className="flex xsm:flex-col md:flex-row justify-between items-center gap-5 w-full">
                    <TextField
                      required
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      placeholder="First Name"
                      type="text"
                      className="w-full"
                      value={values.firstName}
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        ...helperTextStyle,
                      }}
                    />
                    <TextField
                      required
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      placeholder="Last Name"
                      type="text"
                      className="w-full"
                      value={values.lastName}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        ...helperTextStyle,
                      }}
                    />
                  </div>
                  <div className="flex xsm:flex-col md:flex-row gap-5 w-full">
                    <TextField
                      required
                      select
                      label="Country"
                      variant="outlined"
                      name="country"
                      type="text"
                      placeholder="Selecte Your Country"
                      className="flex-1 w-full"
                      value={values.country}
                      error={touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                    <div className="flex xsm:flex-col md:flex-row gap-5 flex-1">
                      <TextField
                        required
                        label="City"
                        name="city"
                        placeholder="type your city"
                        className="w-full"
                        type="text"
                        value={values.city}
                        error={touched.city && !!errors.city}
                        helperText={touched.city && errors.city}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          ...helperTextStyle,
                        }}
                      />
                      <TextField
                        required
                        label="Zip Code"
                        name="zipCode"
                        placeholder="Zipe Code"
                        className="w-full"
                        type="number"
                        value={values.zipCode}
                        error={touched.zipCode && !!errors.zipCode}
                        helperText={touched.zipCode && errors.zipCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        sx={{
                          ...helperTextStyle,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex xsm:flex-col md:flex-row gap-5 w-full">
                    <TextField
                      required
                      label="Street Address"
                      placeholder="Street Address 1"
                      className="w-full"
                      name="streetAddress"
                      type="text"
                      value={values.streetAddress}
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={touched.streetAddress && errors.streetAddress}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        ...helperTextStyle,
                      }}
                    />
                    <TextField
                      required
                      label="Phone Number"
                      placeholder="Phone Number"
                      className="w-full"
                      name="phoneNumber"
                      type="text"
                      value={values.phoneNumber}
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{
                        ...helperTextStyle,
                      }}
                    />
                  </div>
                  <Link href={"/return"}>
                    <button
                      type="submit"
                      className="submit_btn flex justify-center gap-2 items-center"
                      // onClick={}
                    >
                      <span>Next</span>
                      <ArrowRightShort size={20} />
                    </button>
                  </Link>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Checkout;
