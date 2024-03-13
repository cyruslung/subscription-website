import * as Yup from "yup";
import * as regExp from '@/constants/regExp';

export const ActivationSchema = Yup.object().shape({
  email: Yup.string()
    .max(50, "Your email must not exceed 50 characters")
    .email("Invalid email")
    .matches(regExp.emailSpcialcharacterExp, "The format is invalid.")
    .required("Email is required"),
  activationCode: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .min(4, "Your activation code must be at least 4 characters long")
    .max(50, "Activation code  must not exceed 50 characters")
    .required("Activation code is required"),
});