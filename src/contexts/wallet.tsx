"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config as web3Config } from "@/configs/web3.config";

const queryClient = new QueryClient();

function WalletContext({ children }: { children: any }) {
  return (
    <WagmiProvider config={web3Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default WalletContext;
