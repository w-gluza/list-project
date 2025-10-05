import useSWR, { type KeyedMutator } from "swr";
import type { User } from "../users/types/user";
import { fetcher } from "../../common/utils/fetcher";

type UseUsers = {
  data?: User[];
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<User[]>;
};

export function useUsers(): UseUsers {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    "/api/users",
    fetcher
  );

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
