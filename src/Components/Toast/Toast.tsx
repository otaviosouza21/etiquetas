import React from "react";
import styles from "./Toast.module.css";
import alertIcon from '../../assets/icons/alert.svg'

export interface toastType {
  text: string;
  color: string;
}

const Toast = ({ text, color }: toastType) => {
  return (
    <div className={styles.toast} style={{ background: color }}>
      <img src={alertIcon} alt="" />
      <h2>{text}</h2>
    </div>
  );
};

export default Toast;
