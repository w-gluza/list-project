import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";
import { userSchema, type UserFormValues } from "../../validation/userSchema";
import { usePost } from "../../../../common/methods/usePost";
import { usePatch } from "../../../../common/methods/usePatch";
import type { User } from "../../types/user";
import { Button } from "../../../../common/components";

interface UserFormProps {
  mode: "create" | "edit";
  initialValues?: Partial<UserFormValues> & { id: string };
  onClose: () => void;
}

export default function UserForm({
  mode,
  initialValues,
  onClose,
}: UserFormProps) {
  const { execute: createUser, isLoading: isCreating } = usePost<
    UserFormValues,
    User
  >();
  const { execute: updateUser, isLoading: isEditing } = usePatch<
    UserFormValues,
    User
  >();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const onSubmit = async (values: UserFormValues) => {
    const API_URL = "/api/users";
    try {
      if (mode === "create") {
        await createUser(API_URL, values);
      } else {
        await updateUser(`${API_URL}/${initialValues?.id}`, values);
      }
      await mutate(API_URL);
      reset();
      onClose();
    } catch (e) {
      alert(`Failed: ${(e as Error).message}`);
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
        <Button variant="secondary" size="lg" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="lg"
          disabled={isSubmitting || !isValid || isCreating || isEditing}
          type="submit"
        >
          {mode === "create" ? "Create" : "Save"}
        </Button>
      </div>
    </form>
  );
}
