import React, { SetStateAction } from "react";
import Produto from "./Produto/Produto";
import style from "../TableProdutos/TableProdutos.module.css";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { planProdutoTypeNormalize } from "../../../Functions/normalizeData";

interface tableProdutosType {
  lista: planProdutoTypeNormalize[];
  setListaInserida: React.Dispatch<
   React.SetStateAction<planProdutoTypeNormalize[]>
  >;
  updateQuantity: (index: number, quantity: number) => void; 
}

const TableProdutos = ({ lista, setListaInserida,updateQuantity}: tableProdutosType) => {
  function deleteItem(idx: number): void {
    const novaLista = [...lista];
    novaLista.splice(idx, 1);
    setListaInserida(novaLista);
    return;
  }


  return (
    <div className={style.tableProdutos}>
      <ul className={style.produtos}>
        <li className={style.header}>
          <span></span>
          <span>Codigo</span>
          <span>Descricao</span>
          <span>Valor</span>
          <span></span>
        </li>
        {lista?.map((produto, idx) => {
          return (
            <Produto
              deleteItem={deleteItem}
              index={idx}
              produto={produto}
              key={produto.codigo}
              updateQuantity={updateQuantity}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TableProdutos;
