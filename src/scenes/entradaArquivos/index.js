/*
author: Lucas Henrique Messias Gonçalves
Date: 12.08.2024
*/
import { Input } from "@mui/material";
import { useState } from "react";
import * as XLSX from 'xlsx';


const EntradaArquivos = () => {
  const [data, setData] = useState(null);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'array' });
      const sheetName = workbook.SheetNames[3];
      const sheet = workbook.Sheets[sheetName];


      const minRow = 3;

      let data = XLSX.utils.sheet_to_json(sheet);
      console.log(data);
      setData(data)
    };

    reader.readAsArrayBuffer(file);

  };

  return (
    <div>
      <Input type="file" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EntradaArquivos;