import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import useSmartContract from "../src/useSmartContract";
import { useState } from "react";


function SmartContract({provider}) {
  console.log(provider, "====provider");
  const trustchainContract = useSmartContract({provider: provider});
  console.log(trustchainContract, "====trustchainContract");
  function contractview(method, params) {
    return async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });
        if (!accounts) throw new Error("No accounts");
  
        const account = accounts?.tDVW?.[0];
        if (!account) throw new Error("No account");
  
        const result = await trustchainContract?.callViewMethod(method, params);
        console.log(result, "====result");
      } catch (error) {
        console.error(error, "====error");
      }
    
    }
  }

  function contractsend(method, params) {
    return async () => {
      try {
        const accounts = await provider?.request({
          method: MethodsBase.ACCOUNTS,
        });
        if (!accounts) throw new Error("No accounts");
  
        const account = accounts?.tDVW?.[0];
        if (!account) throw new Error("No account");
        console.log(params, "====params")
        const result = await trustchainContract?.callSendMethod(method, params, params);
        console.log(result, "====result");
        return result;
      } catch (error) {
        console.error(error, "====error");
      }
    
    }
  }

  if (!provider) return null;

  return (
    <>
    {/* <div>
      <button onClick={contractsend("ProposeTransfer", {tokenid: "abc", to: "123", from: "456"})}>GetBalance</button>
    </div> */}
    <div>
      <button onClick={contractview("GetTransfer", {tokenid: "TRUSTCHAINSUPPLYCHAIN-1",})}>GetTransfer</button>
    </div>
    <div>
      <button onClick={contractview("GetPendingProposals", {value: "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW"})}>GetPendingProposals</button>
    </div>
    <div>
      <button onClick={contractsend("AcceptTransfer", {tokenid: "TRUSTCHAINSUPPLYCHAIN-1"})}>AcceptTransfer</button>
    </div>
    <div>
      <button onClick={contractview("GetPendingAcceptances", {value: "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW"})}>GetPendingApprovals</button>
      {/* <button onClick={onClick}>Propose traasnfer</button> */}
    </div>
    <div>
      <button onClick={contractsend("ProposeTransfer", {"tokenid": "abcd", "to": "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW", "from": "ELF_2vD3etVrDHrYd79zKREyaY8UrgZFCSjxP5tVTSLcyYpDmg5DLn_tDVW"})}>ProposeTransfer</button>
    </div>
    </>
  );
}

export default SmartContract;