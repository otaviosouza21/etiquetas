// ComponentToPrint.js
import React from 'react';
import Impressao from '../Impressao/Impressao';
import { planProdutoTypeNormalize } from '../../Functions/normalizeData';

interface ComponentToPrintProps {
  produtos: planProdutoTypeNormalize[];
}

export default class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {

  
  render() {
    const { produtos }  = this.props;
    return (
      <div>
        <Impressao produtos={produtos} />
      </div>
    );
  }
}
