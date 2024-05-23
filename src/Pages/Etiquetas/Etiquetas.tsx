import React, { ChangeEvent, useState } from "react";
import style from "./Etiquetas.module.css";
import addIcon from "../../assets/icons/add.svg";
import TableProdutos from "./TableProdutos/TableProdutos";
import ExcelToJson from "../../Functions/ExcelToJson";

const Etiquetas = () => {
  const [inputFile,setInputFile] = useState(null)

  function handleChange(event : ChangeEvent<HTMLInputElement>){
    const file = event.target.files[0]
    setInputFile(file)
  }


  return (
    <main className={`container ${style.etiquetas}`}>
      <h1>Etiquetas para Produtos</h1>
      <div className={style.inputFile}>
        <input
          id="fileInput"
          accept=".xlsx, .xls, .csv"
          type="file"
          onChange={handleChange}
        />
        <p>
          Tabela Atualizada Em: <span>22/05/2024</span>
        </p>
      </div>
      <div className={style.filter}>
        <input type="text" name="" id="" />
        <button className={style.adicionar}>
          <img src={addIcon} alt="" />
        </button>
        <button className={style.contagem}>0 PRODUTOS</button>
      </div>
      <TableProdutos />
      {inputFile && <ExcelToJson file={inputFile} />}
    </main>
  );
};

export default Etiquetas;
