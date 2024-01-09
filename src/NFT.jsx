import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import { useState } from "react";
import useTokenContract from "./useTokenContract";

function Nft({ provider }) {
  const [imgUrl, setImgUrl] = useState();
  const tokenContract = useTokenContract(provider, "AELF");

  const onClick = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.ACCOUNTS,
      });
      if (!accounts) throw new Error("No accounts");

      const result = await tokenContract?.callViewMethod("GetTokenInfo", {
        symbol: "TRUSTCHAINSUPPLYCHAIN-2",
        owner: accounts?.AELF?.[0],
      });

      if (result) {
        const imgUrl = result.data?.externalInfo.value.__nft_image_url;

        if (imgUrl) {
          setImgUrl(imgUrl);
        }
      }
    } catch (error) {
      console.log(error, "====error");
    }
  };

  if (!provider) return null;

  return (
    <>
      <button onClick={onClick}>Get NFT</button>
      <div>
        Your NFT is: <img src={imgUrl} alt="nft" />
      </div>
    </>
  );
}

export default Nft;