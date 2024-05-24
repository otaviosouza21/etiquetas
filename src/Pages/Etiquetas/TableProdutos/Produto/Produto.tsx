import React from "react";
import style from "./Produto.module.css";
import { planProdutoTypeNormalize } from "../../../../Functions/normalizeData";
import currentConvert from "../../../../Functions/currentConvert";
import trashIcon from '../../../../assets/icons/trashed.svg'

const Produto = ({ produto,deleteItem }: { produto: planProdutoTypeNormalize }) => {


  return (
    <li className={style.produto}>
      <span>{produto.codigo}</span>
      <span>{produto.descricao}</span>
      <span>{currentConvert(produto.preco)}</span>
      <span onClick={()=>deleteItem(produto.codigo)}>
        <img src={trashIcon} alt=""  />
      </span>
    </li>
  );
};

export default Produto;
