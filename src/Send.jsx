import {
  IPortkeyProvider,
  MethodsBase,
  ChainId,
} from "@portkey/provider-types";
import BigNumber from "bignumber.js";
import { useState } from "react";
import useTokenContract from "./useTokenContract";
import Button from "@mui/material/Button";

function Send({ provider, chainId, symbol, fromAddress, toAddress }) {
  const tokenContract = useTokenContract(provider, chainId);

  const onClick = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.ACCOUNTS,
      });
      console.log(accounts, "====accounts");
      if (!accounts) throw new Error("No accounts");
      console.log(accounts?.tDVW?.[0]);
      const result = await tokenContract?.callSendMethod(
        "Transfer",
        {
          from: fromAddress,
          to: toAddress,
          symbol: symbol,
          amount: "1",
          memo: "NFT Transfer",
        },
        {
          from: fromAddress,
          to: toAddress,
          symbol: symbol,
          amount: "1",
          memo: "NFT Transfer",
        }
      );
      console.log(result, "====result");
    } catch (error) {
      console.log(error, "====error");
    }
  };

  if (!provider) return null;

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        onClick = {onClick}
      >
        Send NFT
      </Button>
    </div>
  );
}

export default Send;
