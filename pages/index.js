import Button from "@mui/material/Button";
import AElf from "aelf-sdk";
import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";
import { ConfigProvider, Asset, PortkeyAssetProvider } from '@portkey/did-ui-react';
import SmartContract from "../src/SmartContract";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/userSlice";
import { selectUser } from "../store/userSlice";



export default function Home() {
  const user = useSelector(selectUser);
  console.log(user)
  const dispatch = useDispatch();
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
    try {
      const accounts = await provider?.request({
        method: MethodsBase.REQUEST_ACCOUNTS,
      });
      const address = accounts["tDVW"][0];
      setUserAddress(address)
      dispatch(logIn({
        id:address,
      }))
      ; // Assuming the first account is the user's addres
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  useEffect(() => {
    if (!provider) {
      init();
    } else {
      connect();
    }
  }, [provider]);

  if (!provider) return <>Provider not found.</>;

  return (
    <div>
      <h1>Hello</h1>
      <Button
        variant="contained"
        onClick={() => {
          console.log("hello world");
        }}
      >
        Hello world
      </Button>
      {userAddress && <p>{userAddress}</p>}
      <SmartContract provider={provider} />
    </div>
  );
}
