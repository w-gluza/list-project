import { http, HttpResponse } from "msw";
import { USERS } from "../store";
import type { User } from "../../features/users/types/user";

export const getUser = http.get("/api/users/:id", ({ params }) => {
  const id = params.id as string;
  const user = USERS.find((u) => u.id === id);
  if (!user)
    return HttpResponse.json({ message: "User not found" }, { status: 404 });
  return HttpResponse.json<User>(user, { status: 200 });
});
