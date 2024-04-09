import { toHex } from "viem";

export const __CHAIN_IDS__ = {
  bera_testnet: 80085
};

export const __CHAIN_INFO__ = {
  [__CHAIN_IDS__.bera_testnet]: {
    name: "bera testnet",
    image: "/images/berachain.svg",
    chainIDHex: toHex(__CHAIN_IDS__.bera_testnet),
    isTestnet: true
  }
};

export const __PROVIDERS__ = {
  metaMask: {
    image: "/images/metamask.svg",
    name: "Metamask"
  },
  walletConnect: {
    image: "/images/walletconnect.svg",
    name: "WalletConnect"
  },
  coinbaseWalletSDK: {
    image: "/images/coinbase.svg",
    name: "Coinbase Wallet"
  },
  safe: {
    image: "/images/safe.svg",
    name: "Safe Wallet"
  },
  trust: {
    image: "/images/trust.svg",
    name: "Trust Wallet"
  }
};
