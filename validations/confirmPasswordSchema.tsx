import * as Yup from "yup";
import * as regExp from '@/constants/regExp';

export const ConfirmPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(regExp.passwordSpcialcharacterExp, "The format is invalid.")
    .min(8, "Your password must be at least 8 characters long")
    .max(50, "Password  must not exceed 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().when("password", (password, schema) => {
    return password
      ? schema.oneOf([password], "Password must be the same").required()
      : schema;
  }),
});