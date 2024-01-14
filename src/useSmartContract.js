import { IPortkeyProvider, IChain } from "@portkey/provider-types";
import { useEffect, useState } from "react";

function useSmartContract(provider) {
  const [smartContract, setSmartContract] = 
    useState();

  useEffect(() => {
    (async () => {
      if (!provider) return null;

      try {
        // 1. get the sidechain tDVW using provider.getChain
        const chain = await provider?.getChain("tDVW");
        if (!chain) throw new Error("No chain");

        const address = "2od863gNGon8cwzRWfVqVH2XgDzrePXEiZwyY6PfEYM8sFnbYw";

        // 2. get the character contract
        const characterContract = chain?.getContract(address);
        setSmartContract(characterContract);
      } catch (error) {
        console.log(error, "====error");
      }
    })();
  }, [provider]);

  return smartContract;
}

export default useSmartContract;