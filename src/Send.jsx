import {
  IPortkeyProvider,
  MethodsBase,
  ChainId,
} from "@portkey/provider-types";
import BigNumber from "bignumber.js";
import { useState } from "react";
import useTokenContract from "./useTokenContract";
import Button from "@mui/material/Button";
import useSmartContract from "./useSmartContract";

function Send({ provider, chainId, symbol, fromAddress, toAddress }) {

  const tokenContract = useTokenContract(provider, chainId);
  const trustchainContract = useSmartContract({provider: provider});

  function contractsend(method, params) {
    return async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });
        if (!accounts) throw new Error("No accounts");

        const account = accounts?.tDVW?.[0];
        if (!account) throw new Error("No account");
        console.log(params, "====params");
        const result = await trustchainContract?.callSendMethod(
          method,
          params,
          params
        );
        console.log(result, "====result");
        return result;
      } catch (error) {
        console.error(error, "====error");
      }
    };
  }

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
      const result2 = await contractsend(
        "RemoveApprovedProposal",
        {
          address: fromAddress,
          tokenid: symbol,
        }
      )();
      console.log(result2, "====result");
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
        onClick={onClick}
      >
        Send NFT
      </Button>
    </div>
  );
}

export default Send;
