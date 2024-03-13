import * as Yup from "yup";
import * as regExp from '@/constants/regExp';

export const MyAccountSchema = Yup.object().shape({
  email: Yup.string()
    .max(50, "Your email must not exceed 50 characters")
    .email("Invalid email")
    .matches(regExp.emailSpcialcharacterExp, "The format is invalid.")
    .required("Email is required"),
  confirmEmail: Yup.string().when("email", (email, schema) => {
    return email
      ? schema.oneOf([email], "Email must be the same").required()
      : schema;
  }),
  firstName: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("Firstname is required"),
  lastName: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("Lastname is required"),
  oldPassword: Yup.string()
    .matches(regExp.passwordSpcialcharacterExp, "The format is invalid.")
    .min(8, "Your old password must be at least 8 characters long")
    .max(50, "Old password must not exceed 50 characters")
    .required("Old password is required"),
  password: Yup.string()
    .matches(regExp.passwordSpcialcharacterExp, "The format is invalid.")
    .min(8, "Your password must be at least 8 characters long")
    .max(50, "Password must not exceed 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().when("password", (password, schema) => {
    return password
      ? schema.oneOf([password], "Password must be the same").required()
      : schema;
  }),
  phone: Yup.string()
    .matches(regExp.phoneRegExp, "The format is invalid.")
    .required("Phone is required"),
});