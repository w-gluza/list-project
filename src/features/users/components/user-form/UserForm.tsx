import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema, type UserFormValues } from "../../validation/userSchema";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: UserFormValues) => {
    console.warn("values", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div>Country</div>
        <select
          {...register("country")}
          disabled={isSubmitting}
          defaultValue=""
        >
          <option value="" disabled>
            Select country…
          </option>
          <option value="UK">UK</option>
          <option value="Ireland">Ireland</option>
          <option value="US">US</option>
          <option value="Other">Other</option>
        </select>
        {errors.country && (
          <small style={{ color: "red" }}>{errors.country.message}</small>
        )}
      </label>

      <label>
        <div>First name</div>
        <input
          {...register("firstName")}
          placeholder="First name"
          autoComplete="given-name"
          disabled={isSubmitting}
          type="text"
        />
        {errors.firstName && (
          <small style={{ color: "red" }}>{errors.firstName.message}</small>
        )}
      </label>

      <label>
        <div>Last name</div>
        <input
          {...register("lastName")}
          placeholder="Last name"
          autoComplete="family-name"
          disabled={isSubmitting}
          type="text"
        />
        {errors.lastName && (
          <small style={{ color: "red" }}>{errors.lastName.message}</small>
        )}
      </label>

      <label>
        <div>Age</div>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Age"
          disabled={isSubmitting}
          {...register("age")}
        />

        {errors.age && (
          <small style={{ color: "red" }}>{errors.age.message}</small>
        )}
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={isSubmitting || !isValid}>
          Create
        </button>
      </div>
    </form>
  );
}
