import React from "react";
import Produto from "./Produto/Produto";
import style from "../TableProdutos/TableProdutos.module.css";

const TableProdutos = () => {
  return (
    <div className={style.tableProdutos}>
      <ul className={style.header}>
        <li>Codigo</li>
        <li>Descricao</li>
        <li>Valor</li>
      </ul>
      <ul className={style.produtos}>
        <Produto />
        <Produto />
        <Produto />
        <Produto />
        <Produto />
        <Produto />
        <Produto />
        <Produto />
        <Produto />
      </ul>
    </div>
  );
};

export default TableProdutos;
