import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutate } from "swr";
import { userSchema, type UserFormValues } from "../../validation/userSchema";
import { usePost } from "../../../../common/methods/usePost";
import { usePatch } from "../../../../common/methods/usePatch";
import type { User } from "../../types/user";
import { Button, Input, Form, Select } from "../../../../common/components";

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
    control,
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label="Country"
            placeholder="Select country…"
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={isSubmitting}
            error={fieldState.error?.message}
            items={[
              { value: "UK", label: "UK" },
              { value: "Ireland", label: "Ireland" },
              { value: "US", label: "US" },
              { value: "Other", label: "Other" },
            ]}
          />
        )}
      />

      <Input
        label="First name"
        placeholder="First name"
        autoComplete="given-name"
        disabled={isSubmitting}
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <Input
        label="Last name"
        placeholder="Last name"
        autoComplete="family-name"
        disabled={isSubmitting}
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <Input
        type="number"
        inputMode="numeric"
        label="Age"
        placeholder="Age"
        disabled={isSubmitting}
        error={errors.age?.message}
        {...register("age", { valueAsNumber: true })}
      />

      <div
        style={{
          display: "grid",
          gap: 8,
          gridTemplateColumns: "1fr 3fr",
          paddingTop: 8,
        }}
      >
        <Button variant="secondary" size="lg" type="button" onClick={onClose}>
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
    </Form>
  );
}
