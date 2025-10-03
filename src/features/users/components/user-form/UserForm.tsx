import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";
import { userSchema, type UserFormValues } from "../../validation/userSchema";
import { usePost } from "../../../../common/methods/usePost";
import type { User } from "../../types/user";

export default function UserForm() {
  const { execute: createUser, isLoading } = usePost<UserFormValues, User>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: UserFormValues) => {
    const API_URL = "/api/users";
    try {
      await createUser(API_URL, values);
      await mutate(API_URL);
      reset();
    } catch (e) {
      // FIXME: use better error handling (toast)
      alert(`Failed to create user: ${(e as Error).message}`);
    }
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
          type="text"
          {...register("firstName")}
          placeholder="First name"
          autoComplete="given-name"
          disabled={isSubmitting}
        />
        {errors.firstName && (
          <small style={{ color: "red" }}>{errors.firstName.message}</small>
        )}
      </label>

      <label>
        <div>Last name</div>
        <input
          type="text"
          {...register("lastName")}
          placeholder="Last name"
          autoComplete="family-name"
          disabled={isSubmitting}
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
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && (
          <small style={{ color: "red" }}>{errors.age.message}</small>
        )}
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={isSubmitting || !isValid || isLoading}>
          Create
        </button>
      </div>
    </form>
  );
}
