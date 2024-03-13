import * as Yup from "yup";
import * as regExp from '@/constants/regExp';

export const SignInSchema = Yup.object().shape({
  account: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .min(5, "Your account must be at least 5 characters long")
    .max(50, "Account  must not exceed 50 characters")
    .required("Account is required"),
  password: Yup.string()
    .matches(regExp.passwordSpcialcharacterExp, "The format is invalid.")
    .min(8, "Your password must be at least 8 characters long")
    .max(50, "Password  must not exceed 50 characters")
    .required("Password is required"),
});
