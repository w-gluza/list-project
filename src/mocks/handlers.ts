import { listUsers } from "./http/listUsers";
import { createUser } from "./http/createUser";

export const handlers = [listUsers, createUser];
