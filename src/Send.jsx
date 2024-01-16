import {
    IPortkeyProvider,
    MethodsBase,
    ChainId,
  } from "@portkey/provider-types";
  import BigNumber from "bignumber.js";
  import { useState } from "react";
  import useTokenContract from "./useTokenContract";
  
  function Send({
    provider,
    chainId,
    symbol,
  }) {
    const [balance, setBalance] = useState();
    const tokenContract = useTokenContract(provider, chainId);
  
    const onClick = async () => {
      setBalance("Fetching...");
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });
        console.log(accounts, "====accounts");
        if (!accounts) throw new Error("No accounts");
        console.log(accounts?.tDVW?.[0]);
        const result = await tokenContract?.callSendMethod
        ("Transfer", {
          // from: "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW",
          // from: accounts?.tDVW?.[0],
          // to: "ELF_xN3CQBD4gEX2zrdaWD7c3nEUwqxM28zLg41AanW26Mb84vhnQ_tDVW",
          to: accounts?.tDVW?.[0],
          symbol: symbol,
          amount: "1",
          memo: "transfer in demo",
        },
          {
            from: "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW",
            // from: accounts?.tDVW?.[0],
            from: "ELF_xN3CQBD4gEX2zrdaWD7c3nEUwqxM28zLg41AanW26Mb84vhnQ_tDVW",
            // to: accounts?.tDVW?.[0],
            symbol: symbol,
            amount: 1,
            memo: "transfer in demo",
        });
        console.log(result, "====result");
  
        if (result) {
          const balance = result.data?.balance;
          setBalance(new BigNumber(balance).dividedBy(10 ** 8).toFixed(5));
        }
      } catch (error) {
        console.log(error, "====error");
        setBalance("Failed.");
      }
    };
  
    if (!provider) return null;
  
    return (
      <div>
        <button onClick={onClick}>
          Send {chainId} {symbol}
        </button>
      </div>
    );
  }
  
  export default Send;