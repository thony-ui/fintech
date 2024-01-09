import {
    IPortkeyProvider,
    MethodsBase,
    ChainId,
  } from "@portkey/provider-types";
  import BigNumber from "bignumber.js";
  import { useState } from "react";
  import useTokenContract from "./useTokenContract";
  
  function Balance({
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
  
        const result = await tokenContract?.callViewMethod
        ("GetBalance", {
          symbol,
          owner: accounts?.[chainId]?.[0],
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
          Get {chainId} {symbol} Balance
        </button>
        <div>
          {balance} {symbol}
        </div>
      </div>
    );
  }
  
  export default Balance;