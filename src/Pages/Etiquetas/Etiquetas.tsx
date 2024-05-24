import React, { ChangeEvent, useState } from "react";
import style from "./Etiquetas.module.css";
import addIcon from "../../assets/icons/add.svg";
import TableProdutos from "./TableProdutos/TableProdutos";
import ExcelToJson from "../../Functions/ExcelToJson";
import { useGlobalContext } from "../../Context/GlobalContext";
import { planProdutoTypeNormalize } from "../../Functions/normalizeData";
import Toast, { toastType } from "../../Components/Toast/Toast";
import Impressao from "../Impressao/Impressao";
import {
  NavLink,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

const Etiquetas = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [listaInserida, setListaInserida] = useState<
    planProdutoTypeNormalize[]
  >([]);
  const [gerar, setGerar] = useState<boolean>(false);
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
    <Router>
      <main className={`container ${style.etiquetas}`}>
        <Routes>
          <Route
            path="/etiquetas"
            element={<Impressao produtos={listaInserida} />}
          />
        </Routes>
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
            placeholder="Digite o codigo do item"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value;
                insertItem(value);
              }
            }}
            disabled={!planilha}
          />
          <button className={style.contagem}>
            <NavLink to="/etiquetas">{listaInserida.length} PRODUTOS</NavLink>
          </button>
        </div>
        {inputFile && <ExcelToJson file={inputFile} />}
        <TableProdutos
          lista={listaInserida}
          setListaInserida={setListaInserida}
        />
        {alert && <Toast text="Item já inserido" color="tomato" />}
      </main>
    </Router>
  );
};

export default Etiquetas;
