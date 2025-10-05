import { http, HttpResponse } from "msw";
import { USERS } from "../store";
import type { User } from "../../features/users/types/user";

export const createUser = http.post("/api/users", async ({ request }) => {
  const body = (await request.json()) as Partial<User>;

  // Basic validation
  // In real app, we should use the same validation schema on the backend as on the frontend
  if (
    !body?.country ||
    !body?.firstName ||
    !body?.lastName ||
    typeof body?.age !== "number"
  ) {
    return HttpResponse.json(
      { message: "country, firstName, lastName and numeric age are required" },
      { status: 400 }
    );
  }

  const user: User = {
    id: crypto.randomUUID(),
    country: body.country,
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    age: body.age,
  };

  USERS.push(user);
  return HttpResponse.json(user, { status: 201 });
});
