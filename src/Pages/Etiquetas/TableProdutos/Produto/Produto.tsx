import React, { useEffect, useState } from "react";
import style from "./Produto.module.css";
import { planProdutoTypeNormalize } from "../../../../Functions/normalizeData";
import currentConvert from "../../../../Functions/currentConvert";
import trashIcon from '../../../../assets/icons/trashed.svg'

interface produtoParamsType{
  produto: planProdutoTypeNormalize,
  deleteItem: (index:number)=>void,
  index: number
}

const Produto = ({ produto,deleteItem,index }: produtoParamsType) => {
const [quantidade,setQuantidade] = useState<number>(1)

useEffect(()=>{
produto.quantidade = quantidade
console.log(produto);
},[quantidade])


  return (
    <li className={style.produto}>
      <div className={style.quantidade}>
        <span onClick={()=>setQuantidade(quantidade-1)}>-</span>
        {quantidade}
        <span onClick={()=>setQuantidade(quantidade+1)}>+</span>
      </div>
      <span>{produto.codigo}</span>
      <span>{produto.descricao}</span>
      <span>{currentConvert(produto.preco)}</span>
      <span onClick={()=>deleteItem(index)}>
        <img src={trashIcon} alt=""  />
      </span>
    </li>
  );
};

export default Produto;
