import ResponsiveAppBar from "../../components/NavbarWithoutSearchBar";
import Footer from "../../components/Footer";
import ConfirmTransaction from "../../components/ConfirmTransaction";
import React from 'react'
import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";

function ConfirmTransactions() {
    const [provider, setProvider] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
  
    const init = async () => {
      try {
        setProvider(await detectProvider());
      } catch (error) {
        console.log(error, "=====error");
      }
    };
  
    const connect = async () => {
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });
      const address = accounts["tDVW"][0];
      console.log(address, "====address");
      setUserAddress(address);
    };
  
    useEffect(() => {
      if (!provider) init();
      else connect();
    }, [provider]);
    return (
        <>
            <ResponsiveAppBar />
            <ConfirmTransaction provider={provider}/>
            <Footer />
        </>
    )
}

export default ConfirmTransactions