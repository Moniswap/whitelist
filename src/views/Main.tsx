import { useAddToWhitelist, useCountParticipants, useIsOnWhitelist } from "@/hooks/firebase";
import BorderlessArtboard from "@/ui/BorderlessArtBoard";
import { useAccount } from "wagmi";
import Countdown from "react-countdown";
import { useCurrentDateAtomic } from "@/hooks/time";

const WHITELIST_START_TIME = new Date(2024, 3, 10, 13);
const MINTING_START_TIME = new Date(2024, 3, 18, 13);

function Main() {
  const { isConnected } = useAccount();
  const { isLoading: addToWhitelistLoading, whitelist } = useAddToWhitelist();
  const { isLoading: isOnWhitelistLoading, data: isOnWhitelist } = useIsOnWhitelist([addToWhitelistLoading]);
  const { data: countOfParticipants } = useCountParticipants([addToWhitelistLoading]);
  const changingCurrentDate = useCurrentDateAtomic();
  return (
    <div className="py-12 px-4 w-screen flex flex-col justify-start items-center gap-16">
      <section className="w-full flex justify-start items-center gap-3 flex-col">
        <h1 className="uppercase text-[--inverted-text] text-lg md:text-xl py-2 italic text-center font-[500]">
          bera packs whitelist mint registration
        </h1>
        <h3 className="uppercase text-[#cfcfcf] text-sm md:text-lg py-2 italic text-center font-[500]">
          secure your spot!
        </h3>
        <div className="join">
          <img
            src="/images/berapack.png"
            width={1000}
            height={1000}
            alt="bera_pack2"
            className="join-item object-cover object-[100%_0]"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-center items-end md:items-center gap-5 md:gap-12 w-full">
        <div className="flex flex-col justify-start items-end gap-5 border-r border-[#403b3b] px-4 py-2">
          <span className="font-[400] text-[#fff] capitalize text-sm md:text-lg">mint starts in:</span>
          <Countdown
            date={MINTING_START_TIME}
            renderer={({ days, hours, minutes, seconds }) => (
              <span className="font-[500] italic text-[#fff] capitalize text-lg md:text-xl">
                {days}D:{hours}H:{minutes}M:{seconds}S
              </span>
            )}
          />
        </div>
        <div className="flex flex-col justify-start items-end gap-5 border-r border-[#403b3b] px-4 py-2">
          <span className="font-[400] text-[#fff] capitalize text-sm md:text-lg">total participants:</span>
          <span className="font-[500] italic text-[#fff] capitalize text-lg md:text-xl">{countOfParticipants}</span>
        </div>
        <div className="flex flex-col justify-start items-end gap-5 border-r border-[#403b3b] px-4 py-2">
          <span className="font-[400] text-[#fff] capitalize text-sm md:text-lg">whitelist starts in:</span>
          <Countdown
            date={WHITELIST_START_TIME}
            renderer={({ days, hours, minutes, seconds }) => (
              <span className="font-[500] italic text-[#fff] capitalize text-lg md:text-xl">
                {days}D:{hours}H:{minutes}M:{seconds}S
              </span>
            )}
          />
        </div>
      </section>
      <section className="flex justify-center items-center w-full">
        <div className="w-full md:w-1/4">
          <BorderlessArtboard>
            <div className="flex flex-col justify-start items-center w-full gap-5 md:gap-8">
              <div className="flex justify-between items-center gap-3 w-full">
                <img src="/images/hive.svg" width={60} height={60} alt="hive" />
                <h4 className="italic text-[#fff] font-[500] capitalize text-lg md:text-xl text-center">
                  Participate in the Bera Packs NFT Whitelist Mint Lottery.
                </h4>
                <img src="/images/hive.svg" width={60} height={60} alt="hive" />
              </div>
              <div className="w-full flex justify-center items-center">
                <span className="font-[400] text-[#01ff67] text-sm md:text-lg text-center">Open to everyone.</span>
              </div>
              <div className="divider" />
              <div className="w-full flex flex-col justify-start items-start gap-5">
                <h4 className="text-[#fff] font-[400] capitalize text-lg md:text-xl">your status:</h4>
                <span className="text-[#fff] font-[500] text-xl md:text-2xl italic capitalize">
                  {isOnWhitelistLoading ? (
                    <span className="loading loading-spinner loading-sm md:loading-md text-[#fff]"></span>
                  ) : isOnWhitelist ? (
                    "registered"
                  ) : (
                    "--------"
                  )}
                </span>
              </div>
              <div className="divider" />
              <button
                onClick={whitelist}
                disabled={
                  isOnWhitelistLoading ||
                  addToWhitelistLoading ||
                  isOnWhitelist ||
                  !isConnected ||
                  WHITELIST_START_TIME.getTime() > changingCurrentDate.getTime()
                }
                className={`w-full ${
                  isOnWhitelist || !isConnected ? "bg-[#373634]" : "bg-gradient-to-br from-yellow-400 to-orange-500"
                } rounded-[227.46px] btn btn-md md:btn-lg capitalize text-center flex justify-center gap-3 items-center py-1 md:py-5`}
              >
                <span className="text-[#fff] font-[500] text-sm md:text-lg">
                  {WHITELIST_START_TIME.getTime() > changingCurrentDate.getTime()
                    ? "whitelisting not open yet"
                    : !isConnected
                    ? "please connect wallet"
                    : isOnWhitelist
                    ? "registered"
                    : "register"}
                </span>
                {addToWhitelistLoading && (
                  <span className="loading loading-spinner loading-sm md:loading-md text-[#fff]"></span>
                )}
              </button>
            </div>
          </BorderlessArtboard>
        </div>
      </section>
    </div>
  );
}

export default Main;
