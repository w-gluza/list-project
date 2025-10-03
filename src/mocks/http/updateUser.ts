import { http, HttpResponse } from "msw";
import { USERS } from "../store";
import type { User } from "../../features/users/types/user";

export const updateUser = http.patch(
  "/api/users/:id",
  async ({ params, request }) => {
    const id = params.id as string;
    const body = (await request.json()) as Partial<User>;

    const index = USERS.findIndex((u) => u.id === id);
    if (index === -1) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (body.age !== undefined && typeof body.age !== "number") {
      return HttpResponse.json(
        { message: "Age must be numeric" },
        { status: 400 }
      );
    }

    USERS[index] = { ...USERS[index], ...body };
    return HttpResponse.json(USERS[index], { status: 200 });
  }
);
