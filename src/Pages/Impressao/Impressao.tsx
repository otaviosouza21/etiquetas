import React from "react";
import styles from "../Impressao/Impressao.module.css";
import { planProdutoTypeNormalize } from "../../Functions/normalizeData";
import logoCiclo from "../../assets/icons/Logo.jpg";
import currentConvert from "../../Functions/currentConvert";

const Impressao = ({ produtos }: { produtos: planProdutoTypeNormalize[] }) => {


  return (
    <section className={styles.impressaoContainer}>
      <ul className={styles.etiquetas}>
        {produtos.map((etiqueta,id) => {
          if (etiqueta.quantidade) {
            const quantidadeEtiquetas = [];
            for (let i = 0; i < etiqueta.quantidade; i++) {
              quantidadeEtiquetas.push(
                <li key={id} className={styles.etiqueta}>
                  <img src={logoCiclo} alt="" />
                  <h4>{etiqueta.codigo}</h4>
                  <span className={styles.descricao}>{etiqueta.descricao}</span>
                  <span className={styles.preco}>{currentConvert(etiqueta.preco)}
                  </span>
                </li>
              );
            }
            return quantidadeEtiquetas;
          }
        })}
      </ul>
    </section>
  );
};

export default Impressao;
