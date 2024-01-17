import * as React from 'react';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme


export default function TransactionDisplay() {
  const [rowData, setRowData] = useState([
    { "number": 1, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 2, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 3, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 4, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 5, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 6, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 7, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
    { "number": 8, "sender": "Tesla", "sender address": "Model Y", "receiver": 64950, "receiver address": true, "transaction date": "2024-033-04" },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "number" },
    { field: "sender" },
    { field: "sender address" },
    { field: "receiver" },
    { field: "receiver address" },
    { field: "transaction date" }
  ]);

  

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: '100%' }}>
      {/* The AG Grid component */}
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}