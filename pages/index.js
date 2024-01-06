import Button from "@mui/material/Button";
import AElf from "aelf-sdk";
import { useEffect, useState } from "react";
import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import detectProvider from "@portkey/detect-provider";
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

export default function Home() {
    const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
    console.log(aelf);
    return (
        <div>
            <h1>Hello</h1>
            <Button variant="contained" onClick = {() => {console.log("hello world")}}>Hello world</Button>;
        </div>
    )
}
