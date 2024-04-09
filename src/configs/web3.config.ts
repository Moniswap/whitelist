import { createClient } from "viem";
import { http, createConfig } from "wagmi";
import { berachainTestnet } from "wagmi/chains";
import { walletConnect, injected, coinbaseWallet, safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [berachainTestnet],
  multiInjectedProviderDiscovery: false,
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({ appName: "Moniswap" }),
    safe(),
    walletConnect({
      projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID as string,
      relayUrl: "wss://relay.walletconnect.com"
    }),
    injected({
      target() {
        return {
          id: "trust",
          name: "Trust Wallet",
          provider: typeof window !== "undefined" ? (window as any).trustwallet : undefined
        };
      }
    })
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  }
});
