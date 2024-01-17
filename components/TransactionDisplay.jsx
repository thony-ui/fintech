import * as React from 'react';
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";



export default function TransactionDisplay({id}) {
  const [users, setUsers] = useState([]);
  // let dic = {}
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
  //     try {
  //       setUsers(snapshot.docs);
  //     } catch (error) {
  //       console.error("Error reading data:", error);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [db]);
  // users.map((user) => {
  //   dic[user?.data().elfid] = user.data()?.firstname
  // })
  // console.log(dic)
  // anthony you can use `transactionInformationList` to query firebase
  const [transactionInformationList, setTransactionInformationList] = useState([]);


  let transactionList

  useEffect(() => {
    async function getTransactionList() {
      try {
        const response = await fetch(`/api/proxy?id=${id}`);
        transactionList = await response.json();
        console.log(transactionList);

        setTransactionInformationList(
          transactionList.data.list.map(l => {
            return {
              "id": l.id,
              "addressFrom": l.addressFrom,
              "addressTo": l.addressTo,
              "time": l.time.slice(0, 10)
            }
          })
        )
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getTransactionList()
  }, [])

  console.log(transactionInformationList)
  
  return (
    <div className="">
      {/* The AG Grid component */}
    </div>
  );
}