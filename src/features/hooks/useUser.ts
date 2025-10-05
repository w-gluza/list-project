import useSWR, { type KeyedMutator } from "swr";
import type { User } from "../users/types/user";
import { fetcher } from "../../common/utils/fetcher";

type UseUser = {
  data?: User;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<User>;
};

export function useUser(userId?: string): UseUser {
  const key = userId ? `/api/users/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR<User>(key, fetcher);

  return {
    data,
    isLoading,
    isError: Boolean(error),
    mutate,
  };
}
