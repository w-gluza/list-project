import { http, HttpResponse } from "msw";
import { USERS } from "../store";

export const listUsers = http.get("/api/users", () => {
  return HttpResponse.json(USERS);
});
