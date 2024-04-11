import { addToWhitelist, checkIfRegistered, countParticipants } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useCountParticipants(deps: any[] = []) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(0);

  useEffect(() => {
    setLoading(true);
    countParticipants()
      .then(count => {
        setData(count);
        setLoading(false);
      })
      .catch(error => {
        setData(0);
        console.debug(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return { data, isLoading };
}

export function useIsOnWhitelist(deps: any[] = []) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setLoading(true);
      checkIfRegistered(address)
        .then(registered => {
          setData(registered);
          setLoading(false);
        })
        .catch(error => {
          setData(false);
          console.debug(error);
          setLoading(false);
        });
    } else setData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, ...deps]);
  return { data, isLoading };
}

export function useAddToWhitelist() {
  const [isLoading, setLoading] = useState(false);
  const { address } = useAccount();

  const whitelist = useCallback(() => {
    if (address) {
      setLoading(true);
      addToWhitelist(address)
        .then(() => setLoading(false))
        .catch(error => {
          setLoading(false);
          console.debug(error);
        });
    }
  }, [address]);

  return { isLoading, whitelist };
}
