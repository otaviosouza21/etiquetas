import React, { useContext } from "react";
import * as XLSX from "xlsx";
import {
  useGlobalContext,
} from "../Context/GlobalContext";
import { normalizeData, planProdutoType } from "./normalizeData";

interface ExcelToJsonProps {
  file: File | null;
}

const ExcelToJson: React.FC<ExcelToJsonProps> = ({ file }) => {
  const {planilha,setPlanilha} = useGlobalContext()

  
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
          const jsonData: planProdutoType[] = XLSX.utils.sheet_to_json(sheet);
          localStorage.setItem("planilha", JSON.stringify(jsonData));

          const produtosNormalizados = jsonData.map((produto) => {
            if(produto) return normalizeData(produto)
          });
        
         setPlanilha(produtosNormalizados)
          
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return null;
};

export default ExcelToJson;
