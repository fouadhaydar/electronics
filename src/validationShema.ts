import { object, ref, string } from "yup";

const regEmail = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}$/;
const regPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,}/;
const regPhoneNumber = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const emailHelperText = "Email should be like first.last@subdomain.example.net";
const passwordHelperText =
  "password must be at least 8 char and contain at least one: lowercase letter uppercase letter number(0-9) Special characte";
const phoneNumberHelperText = "Phone number should be like +44 7777 777 777";

export const signUpValidation = object().shape({
  userName: string().required("User Name Is Required"),
  email: string()
    .email(emailHelperText)
    .matches(regEmail, emailHelperText)
    .required("Please Enter A Valid Email"),

  phoneNumber: string()
    .matches(regPhoneNumber, phoneNumberHelperText)
    .required(phoneNumberHelperText),

  password: string()
    .matches(regPassword, passwordHelperText)
    .required(passwordHelperText),
  country: string().oneOf(["Lebanon", "Egypt", "Uk", "US", "UA", "Jorden"]),

  confirmPassword: string()
    .oneOf([ref("password")], "Your Confirmation Is Wrong")
    .required("Please Confirm Your Password"),
});
// .required("Please Select Your Country"),

export const logInValidation = object().shape({
  email: string()
    .email(emailHelperText)
    .matches(regEmail, emailHelperText)
    .required("Please Enter A Valid Email"),
  password: string()
    .matches(regPassword, passwordHelperText)
    .required(passwordHelperText),
});

export const billingValidation = object().shape({
  firstName: string().required("First Name Is Required"),
  lastName: string().required("Last Name Is Required"),
  country: string()
    .required("Country Is Required")
    .oneOf(["Lebanon", "Egypt", "Uk", "US", "UA", "Jorden"]),
  city: string().required("City is Required"),
  zipCode: string().required("Zipe Code is Required"),
  streetAddress: string().required("Street address Is Required"),
  phoneNumber: string()
    .required(phoneNumberHelperText)
    .matches(regPhoneNumber, phoneNumberHelperText),
});
