/* eslint-disable jsx-a11y/anchor-is-valid */

import { __CHAIN_INFO__, __CHAIN_IDS__, __PROVIDERS__ } from "@/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiChevronUp, BiExit } from "react-icons/bi";
import { useChains, useChainId, useSwitchChain, useAccount, useDisconnect } from "wagmi";
import { customEllipsize } from "@/utils/misc";
import WalletConnectModal from "./WalletConnectModal";

function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const { isConnected, address, connector } = useAccount();
  const chains = useChains();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const chainInfo = useMemo(() => __CHAIN_INFO__[chainId ?? __CHAIN_IDS__.bera_testnet], [chainId]);
  const [chainSwitchOpen, setChainSwitchOpen] = useState(false);
  const { switchChain } = useSwitchChain();
  const walletConnectModalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const triggerHeight = 100; // Set your desired scroll height here

      setIsFixed(scrollHeight > triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-screen relative">
        <div className={`flex h-[70px] md:h-[70px] ${isFixed ? " bg-[#000] fixed top-0 z-50 w-full" : ""} `}>
          <div className="w-full mx-[20px] flex items-center justify-between border-[rgba(43,43,43,1)]  border-b-2">
            <div className="flex items-center justify-start w-1/3">
              <a href="/">
                <img src="/images/logo.png" width={150} height={60} alt="logo" className="hidden md:flex" />
                <img src="/images/md_logo.png" width={40} height={40} alt="logo" className="flex md:hidden" />
              </a>
            </div>
            <div className="flex items-center justify-end gap-3 w-1/3">
              <details
                className="dropdown hidden md:block dropdown-end"
                open={chainSwitchOpen}
                onToggle={event => setChainSwitchOpen(event.currentTarget.open)}
              >
                <summary className="bg-white btn-circle p-2 btn btn-ghost btn-sm md:btn-md flex justify-center items-center">
                  <img src={chainInfo.image} width={20} height={20} alt={chainInfo.name} />
                </summary>
                <ul className="p-2 w-60 dropdown-content menu rounded-[5px] z-[1] bg-[#111111] menu-lg shadow-lg">
                  <li className="menu-title">
                    <div className="flex justify-between items-center w-full">
                      <span className="capitalize font-[400] text-[#cfcfcf] text-sm">select network</span>
                      <button className="btn btn-ghost btn-square btn-sm" onClick={() => setChainSwitchOpen(false)}>
                        <BiChevronUp size={15} color="#8c8c8c" />
                      </button>
                    </div>
                  </li>
                  {chains.map(chain => (
                    <li key={chain.id}>
                      <a
                        onClick={() => {
                          switchChain({ chainId: chain.id });
                          setChainSwitchOpen(false);
                        }}
                        className={`flex justify-start items-center gap-3 ${
                          chain.id === parseInt(chainInfo.chainIDHex)
                            ? "text-[--border-left-active-bg] font-[500]"
                            : "font-[400] text-[#fff]"
                        }`}
                      >
                        <img
                          src={__CHAIN_INFO__[chain.id].image}
                          width={25}
                          height={25}
                          alt={__CHAIN_INFO__[chain.id].name}
                          className="rounded-full"
                        />
                        <span className="capitalize text-sm">{__CHAIN_INFO__[chain.id].name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
              <button className="bg-white rounded-full p-2 btn btn-ghost btn-sm flex justify-center items-center md:hidden">
                <img src={chainInfo.image} width={16} height={16} alt={chainInfo.name} />
              </button>
              {!isConnected ? (
                <button
                  className="btn md:btn-md outline-none border-0 text-white text-sm font-[400] bg-gradient-to-br from-yellow-400 to-orange-500 h-10 min-h-10 rounded-md capitalize"
                  onClick={() => {
                    if (walletConnectModalRef.current) walletConnectModalRef.current.checked = true;
                  }}
                >
                  connect
                </button>
              ) : (
                <button
                  className="w-50 m-1 btn btn-ghost flex justify-start items-center gap-3 bg-[#111111] capitalize px-2 py-2 rounded-[5px]"
                  onClick={() => disconnect()}
                >
                  <img
                    src={__PROVIDERS__[connector?.id as keyof typeof __PROVIDERS__]?.image}
                    width={25}
                    height={25}
                    alt={__PROVIDERS__[connector?.id as keyof typeof __PROVIDERS__]?.name}
                    className="rounded-full"
                  />
                  <span className="text-sm md:text-lg font-[500] text-zinc-500">
                    {customEllipsize(address as string, 6, 4)}
                  </span>
                  <BiExit color="#8c8c8c" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <WalletConnectModal
        ref={walletConnectModalRef}
        close={() => {
          if (walletConnectModalRef.current) walletConnectModalRef.current.checked = false;
        }}
      />
    </>
  );
}

export default Header;
