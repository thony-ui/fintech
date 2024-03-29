import { IPortkeyProvider, IChain, ChainId } from "@portkey/provider-types";
import { useEffect, useState } from "react";
import AElf from "aelf-sdk";

function useTokenContract(provider, chainId) {
  const [tokenContract, setTokenContract] =
    useState();

  useEffect(() => {
    (async () => {
      if (!provider) return null;

      try {
        // 1. get the chain using provider.getChain
        const chain = await provider?.getChain(chainId);
        if (!chain) throw new Error("No chain");

        // 2. get the chainStatus
        const chainStatus = await chain?.getChainStatus();
        if (!chainStatus) throw new Error("No chain status");

        // 3. get chainStatus.GenesisContractAddress
        const genesisContractAddress = chainStatus?.GenesisContractAddress;
        if (!genesisContractAddress)
          throw new Error("No genesis contract address");

        // 4. get the genesis contract
        const genesisContract = chain?.getContract(genesisContractAddress);
        if (!genesisContract) throw new Error("No genesis contract");

        // 5. call view method GetContractAddressByName to get the token contract address
        const { data } =
          await genesisContract.callViewMethod(
            "GetContractAddressByName",
            AElf.utils.sha256("AElf.ContractNames.Token")
          );
        console.log(data, "====data");
        if (!data) throw new Error("No token contract address");

        // 6. get the token contract
        const tokenContract = chain?.getContract(data);
        setTokenContract(tokenContract);
      } catch (error) {
        console.log(error, "====error");
      }
    })();
  }, [provider, chainId]);

  return tokenContract;
}

export default useTokenContract;