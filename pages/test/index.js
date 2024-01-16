import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";
import SmartContract from "../../components/SmartContract";
import SendNFT from "../../components/sendNFT";
import Send from "../../src/Send";
import Balance from "../../src/Balance";

function App() {
  const [provider, setProvider] = useState(null);

  const init = async () => {
    try {
      setProvider(await detectProvider());
    } catch (error) {
      console.log(error, "=====error");
    }
  };

  const connect = async () => {
    await provider?.request({
      method: MethodsBase.REQUEST_ACCOUNTS,
    });
  };

  useEffect(() => {
    if (!provider) init();
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

  return (
    <>
      <Send provider={provider} chainId="tDVW" symbol="TRUSTCHAINSUPPLYCHAIN-6"/>
      <button onClick={connect}>Connect</button>
      <SmartContract provider={provider} />
    </>
  );
}

export default App;