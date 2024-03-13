import * as Yup from "yup";
import * as regExp from '@/constants/regExp';

export const ForgotPasswordSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .min(4, "Your verification code must be at least 4 characters long")
    .max(50, "Verification code  must not exceed 50 characters")
    .required("Verification code is required"),
});