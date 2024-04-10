import { useEffect, useState } from "react";

export function useCurrentDateAtomic() {
  const [data, setData] = useState(new Date());

  useEffect(() => {
    setInterval(() => setData(new Date()), 1000);
  }, []);

  return data;
}
