import React, { ChangeEvent, useEffect, useRef, useState, version } from "react";
import style from "./Etiquetas.module.css";
import addIcon from "../../assets/icons/add.svg";
import TableProdutos from "./TableProdutos/TableProdutos";
import ExcelToJson from "../../Functions/ExcelToJson";
import { useGlobalContext } from "../../Context/GlobalContext";
import { planProdutoTypeNormalize } from "../../Functions/normalizeData";
import Toast, { toastType } from "../../Components/Toast/Toast";
import Impressao from "../Impressao/Impressao";
import printerIcon from "../../assets/icons/printer.svg";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

const Etiquetas = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [listaInserida, setListaInserida] = useState<planProdutoTypeNormalize[]>([]);
  const [alert, setAlert] = useState<toastType | null>(null);
  const { planilha } = useGlobalContext();
  const etiquetasRef = useRef<ComponentToPrint>(null);
  const handlePrint = useReactToPrint({
    content: () => etiquetasRef.current,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setInputFile(file);
  }

  function insertItem(value: string) {
    if(!planilha) return
    const filteredItems = planilha.filter((produto) => produto.codigo === value);
    const itemExists = listaInserida?.some((item) => item.codigo === value);

      if (filteredItems.length === 0) {
        setAlert({ text: "Produto não encontrado", color: "gold" });
        setTimeout(() => {setAlert(null);}, 2000);
      } else if (!itemExists) {
        setListaInserida((prevItems) => [...prevItems, ...filteredItems]);
      } else {
        setAlert({ color: "tomato", text: "Item Já Inserido" });
        setTimeout(() => {setAlert(null);}, 2000);
      }

  }

  const updateQuantity = (index: number, quantity: number) => {
    setListaInserida((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, quantidade: quantity } : item))
    );
  };

  useEffect(() => {
    // Adicione um efeito para observar a atualização da listaInserida
    if (etiquetasRef.current) {
      etiquetasRef.current.forceUpdate();
    }
  }, [listaInserida]);


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
        <p>Tabela Atualizada Em: <span>22/05/2024</span></p>
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
        
        <button onClick={handlePrint} className={style.contagem}>
          <img src={printerIcon} alt="" />
          <span>{listaInserida.length} PRODUTOS</span>
        </button>
      </div>

      {inputFile && <ExcelToJson file={inputFile} />}
      <TableProdutos lista={listaInserida} setListaInserida={setListaInserida}  updateQuantity={updateQuantity}/>
      <ComponentToPrint ref={etiquetasRef} key={listaInserida.length} produtos={listaInserida} />
      {alert && <Toast text={alert.text} color={alert.color} />}
    </main>
  );
};

export default Etiquetas;
