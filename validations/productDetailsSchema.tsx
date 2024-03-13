import * as Yup from "yup";
import * as regExp from '@/constants/regExp';

export const ProductDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("Firstname is required"),
  lastName: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("Lastname is required"),
  country: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("Country is required"),
  address: Yup.string()
    .matches(regExp.addressSpcialcharacterExp, "The format is invalid.")
    .required("Address is required"),
  city: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("City is required"),
  state: Yup.string()
    .matches(/^[^%!&-/*+'"?<>\s/\\]+$/, "The format is invalid.")
    .required("State is required"),
  zip: Yup.string()
    .matches(regExp.zipcodespcialcharacterExp, "The format is invalid.")
    .required("Zip is required"),
  phone: Yup.string()
    .matches(regExp.phoneRegExp, "The format is invalid.")
    .required("Phone is required"),
  email: Yup.string()
    .max(50, "Your email must not exceed 50 characters")
    .email("Invalid email")
    .matches(regExp.emailSpcialcharacterExp, "The format is invalid.")
    .required("Email is required"),
});