import React, { ChangeEvent, useState } from "react";
import style from "./Etiquetas.module.css";
import addIcon from "../../assets/icons/add.svg";
import TableProdutos from "./TableProdutos/TableProdutos";
import ExcelToJson from "../../Functions/ExcelToJson";
import { useGlobalContext } from "../../Context/GlobalContext";
import { planProdutoTypeNormalize } from "../../Functions/normalizeData";
import Toast, { toastType } from "../../Components/Toast/Toast";

const Etiquetas = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [listaInserida, setListaInserida] = useState<
    planProdutoTypeNormalize[]
  >([]);
  const [alert, setAlert] = useState<toastType | null>(null);
  const { planilha } = useGlobalContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setInputFile(file);
  }

  function insertItem(value: string) {
    if (planilha) {
      const filteredItems = planilha.filter(
        (produto) => produto.codigo === value
      );

      const itemExists = listaInserida?.some((item) => item.codigo === value);

      if (filteredItems.length === 0) {
        setAlert({ text: "Produto não encontrado", color: "gold" });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
        return null;
      }

      if (!itemExists) {
        setListaInserida((prevItems) => [...prevItems, ...filteredItems]);
      } else {
        setAlert({ color: "tomato", text: "Item Já Inserido" });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    }
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
        <input
          type="text"
          id="filtro"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value;
              insertItem(value);
            }
          }}
          disabled={planilha ? false : true}
        />
        <button className={style.adicionar}>
          <img src={addIcon} alt="" />
        </button>
        <button className={style.contagem}>{listaInserida.length} PRODUTOS</button>
      </div>
      {inputFile && <ExcelToJson file={inputFile} />}
      <TableProdutos lista={listaInserida} />
      {alert && <Toast text="Iten já inserido" color="tomato" />}
    </main>
  );
};

export default Etiquetas;
