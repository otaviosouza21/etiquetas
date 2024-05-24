import React from "react";
import Produto from "./Produto/Produto";
import style from "../TableProdutos/TableProdutos.module.css";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { planProdutoTypeNormalize } from "../../../Functions/normalizeData";

const TableProdutos = ({ lista }: { lista: planProdutoTypeNormalize[] }) => {



  return (
    <div className={style.tableProdutos}>
      <ul className={style.header}>
        <li>Codigo</li>
        <li>Descricao</li>
        <li>Valor</li>
        <li></li>
      </ul>
      <ul className={style.produtos}>
        {lista?.map((produto) => {
          return <Produto /* deleteItem={deleteItem} */ produto={produto} key={produto.codigo} />;
        })}
      </ul>
    </div>
  );
};

export default TableProdutos;
