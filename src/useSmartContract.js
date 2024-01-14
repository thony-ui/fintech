import { IPortkeyProvider, IChain } from "@portkey/provider-types";
import { useEffect, useState } from "react";

function useSmartContract({provider}) {
  const [smartContract, setSmartContract] =
    useState();
  useEffect(() => {
    (async () => {
      if (!provider) return null;

      try {
        // 1. get the sidechain tDVW using provider.getChain
        const chain = await provider?.getChain("tDVW");
        console.log(chain, "====chain")
        if (!chain) throw new Error("No chain");

        const address = "RZBrwaxtQwtxy6RD77GoZzNx1XRMwHFfCNqYbEiSr4akQTUjd";

        // 2. get the character contract
        const Contract = chain?.getContract(address);
        console.log(Contract);
        setSmartContract(Contract);
      } catch (error) {
        console.log(error, "====error");
      }
    })();
  }, [provider]);

  return smartContract;
}

export default useSmartContract;