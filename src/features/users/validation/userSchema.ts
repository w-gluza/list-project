import * as yup from "yup";
import { MIN_AGE_BY_COUNTRY, COUNTRIES, type Country } from "../types/user";

const NAME_UNICODE = /^[\p{L}\p{M}][\p{L}\p{M}\s'-]*$/u;

export const userSchema = yup.object({
  country: yup
    .mixed<Country>()
    .oneOf(COUNTRIES)
    .required("Country is required"),

  firstName: yup
    .string()
    .trim()
    .min(5, "Min 5 characters")
    .max(20, "Max 20 characters")
    .matches(
      NAME_UNICODE,
      "Only letters, spaces, apostrophes (') and hyphens (-)"
    )
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .min(5, "Min 5 characters")
    .max(20, "Max 20 characters")
    .matches(
      NAME_UNICODE,
      "Only letters, spaces, apostrophes (') and hyphens (-)"
    )
    .required("Last name is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .integer("Age must be an integer")
    .required("Age is required")
    .when(["country"], ([country], schema) => {
      const c = (country ?? "Other") as Country;
      const min = MIN_AGE_BY_COUNTRY[c];
      return schema.min(min, `Min age is ${min}`);
    }),
});

export type UserFormValues = yup.InferType<typeof userSchema>;
