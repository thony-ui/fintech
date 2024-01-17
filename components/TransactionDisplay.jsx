import * as React from 'react';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

const MOCKDATA = [
  { "number": 1, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 2, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 3, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 4, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 5, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 6, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 7, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  { "number": 8, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
]

export default function TransactionDisplay({id}) {
  const [rowData, setRowData] = useState([]);
  // anthony you can use `transactionInformationList` to query firebase
  const [transactionInformationList, setTransactionInformationList] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "number" },
    { field: "sender" },
    { field: "sender address" },
    { field: "receiver" },
    { field: "receiver address" },
    { field: "transaction date" }
  ]);

  let transactionList

  React.useEffect(() => {
    async function getTransactionList() {
      try {
        const response = await fetch("/api/proxy");
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
    <div className="ag-theme-quartz" style={{ height: 500, width: '100%' }}>
      {/* The AG Grid component */}
      <AgGridReact rowData={MOCKDATA} columnDefs={colDefs} />
    </div>
  );
}