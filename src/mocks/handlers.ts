import { listUsers } from "./http/listUsers";
import { createUser } from "./http/createUser";
import { updateUser } from "./http/updateUser";
import { getUser } from "./http/getUser";

export const handlers = [listUsers, createUser, getUser, updateUser];
