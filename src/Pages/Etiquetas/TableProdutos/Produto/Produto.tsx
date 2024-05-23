import React from 'react'
import style from './Produto.module.css'

const Produto = () => {
  return (
    <li className={style.produto}>
      <span>10.0089</span>
      <span>CAMARA 26 BUTIL KENDA 26.1/98 TAUNUS</span>
      <span>19.17</span>
    </li>
  )
}

export default Produto