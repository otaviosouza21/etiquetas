import React, { useContext } from 'react';
import * as XLSX from "xlsx";
import GlobalContext, { GlobalContextType } from '../Context/GlobalContext';

interface ExcelToJsonProps {
  file: File | null;
}

const ExcelToJson: React.FC<ExcelToJsonProps> = ({ file }) => {
  const { setPlanilha } = useContext(GlobalContext);

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target?.result;
        if (data) {
          // Use a biblioteca SheetJS para ler a planilha
          const workbook = XLSX.read(data, { type: "array" });

          // Acessa a primeira planilha do arquivo
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Converte a planilha para um objeto JSON
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          localStorage.setItem("planilha", JSON.stringify(jsonData));
          setPlanilha(jsonData);
          console.log(jsonData);
          
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [file, setPlanilha]);

  return null;
};

export default ExcelToJson;
