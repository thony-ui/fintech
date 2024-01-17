import Button from "@mui/material/Button";
import AElf from "aelf-sdk";
import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";
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
import SearchProduct  from "../components/SearchProduct"

async function testAPI() {
  try {
    const response = await fetch("/api/proxy");
    const movies = await response.json();
    console.log(movies);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


export default function Home() {

  const user = useSelector(selectUser);
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
      <SearchProduct />
      {/* <SmartContract provider={provider} /> */}
      <button onClick={() => testAPI()}>CLick me</button>
    </div>
  );
}
