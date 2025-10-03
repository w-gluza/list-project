import { useCallback, useState } from "react";
import axios from "axios";

export function usePost<TReq, TRes>() {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (url: string, body: TReq): Promise<TRes> => {
      setIsLoading(true);
      try {
        const res = await axios.post<TRes>(url, body, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          validateStatus: (s) => s >= 200 && s < 300,
        });
        return res.data;
      } catch (e) {
        const msg = axios.isAxiosError(e)
          ? (e.response?.data?.message ?? e.message ?? "Request failed")
          : "Request failed";
        throw new Error(msg);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { execute, isLoading };
}
