import { useAccount, useSignMessage } from "wagmi";
import { useEffect, useState } from "react";
import { Account, Connect } from "./components";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";

export function App() {
  const { isConnected, address } = useAccount();
  const [isConnecting, setIsConnecting] = useState(isConnected);
  const [isEligible, setIsEligible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [network, setNetwork] = useState("goerli");
  const baseUrl = "https://faucet-api.ethbrno.cz";

  const getEligibilityData = async () => {
    if (!address) return;
    setIsFetching(true);
    try {
      const apiResponse = await fetch(`${baseUrl}/lookup?addr=${address}`);
      const res = await apiResponse.json();
      if (res?.tokenId) setIsEligible(true);
      else setIsEligible(false);
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      //console.log(variables.message);
      getTokenData(data, String(variables.message));
    },
  });

  const getTokenData = async (data: string, message: string) => {
    const valaddress = verifyMessage(message, data);
    const tokenmessage = {
      "addr": valaddress,
      "network": network,
      "signature": {
        "msg": message,
        "sig": data,
      },
      "wait": true,
    };
    //console.log(JSON.stringify(tokenmessage));
    fetch(`${baseUrl}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'no-cors',
      body: JSON.stringify(tokenmessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function initiateTokenFall(): any {
    setIsFetching(true);
    const message = {
      "id": "ethbrno-sbt-faucet",
      "network": network,
      "timestamp": new Date().toISOString(),
    };
    const msg: SignMessageArgs = { message: JSON.stringify(message) };
    signMessage(msg);
  }

  useEffect(() => {
    getEligibilityData();
  }, [address]);

  function revalidate() {
  }

  //console.log(isEligible);

  return (
    <>
      <section>
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center opacity-70">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
              Soulbound
              <br />
              <p className="font-bold text-[#3441c0]">ETH Faucet</p>
            </h1>
            {isConnected && (
              <div className="flex items-baseline my-6">
                <div className="space-x-6 flex text-sm font-medium">
                  <label>
                    <input
                      className="sr-only peer"
                      name="size"
                      type="radio"
                      value="goerli"
                      checked={network == "goerli"}
                      onChange={() => setNetwork("goerli")}
                    />
                    <div className="relative w-16 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-[#3441c0] cursor-pointer">
                      GOERLI
                    </div>
                  </label>
                  <label>
                    <input
                      className="sr-only peer"
                      name="size"
                      type="radio"
                      value="sepolia"
                      checked={network == "sepolia"}
                      onChange={() => setNetwork("sepolia")}
                    />
                    <div className="relative w-16 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-[#3441c0] cursor-pointer">
                      SEPOLIA
                    </div>
                  </label>
                </div>
              </div>
            )}
            {}
            <p className="mb-8 leading-relaxed">
              If you own a Soulbound token you can ask for up to 200 ETH for
              either Goerli and Sepolia testnets. This should be enough not only
              for a development purposes, but also for prepaid gas transactions
              for your testing users. These tokens have no real monetary value.
              Every request grants you 50 ETH and there is a request cooldown
              for 5 hours to avoid misuse.
            </p>
            {!isConnecting || isConnected
              ? (
                <div className="mb-4 text-sm font-medium">
                  <div className="flex space-x-4">
                    <button
                      className={isConnected ? `whitebtn` : `greenbtn`}
                      onClick={() => setIsConnecting(true)}
                      disabled={isFetching || isConnected}
                    >
                      Connect
                    </button>
                    <button
                      className={isEligible ? `whitebtn` : `redbtn`}
                      onClick={() => {
                        revalidate;
                      }}
                      disabled={isFetching || isEligible}
                    >
                      Validate
                    </button>
                    <button
                      className={isEligible ? `greenbtn` : `whitebtn`}
                      onClick={() => initiateTokenFall()}
                      disabled={isFetching}
                    >
                      Get Tokens
                    </button>
                  </div>
                </div>
              )
              : (
                <div className="mb-4 text-sm font-medium">
                  <Connect />
                </div>
              )}
            {!isEligible && (
              <div className="my-4 text-xs">
                We cannot find a Soubound token in your wallet.{" "}
                <a
                  className="font-bold underline"
                  href="https://mint.ethbrno.cz/"
                >
                  Mint yours here.
                </a>
              </div>
            )}
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/3 w-5/6 flex justify-center">
            <img
              className="object-cover object-center w-36"
              alt="ETH Logo"
              src="eth-glyph-colored.png"
            />
          </div>
        </div>
      </section>
    </>
  );
}
