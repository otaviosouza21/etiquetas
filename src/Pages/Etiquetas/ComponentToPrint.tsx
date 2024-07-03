// ComponentToPrint.js
import React from 'react';
import Impressao from '../Impressao/Impressao';
import { planProdutoTypeNormalize } from '../../Functions/normalizeData';

interface ComponentToPrintProps {
  produtos: planProdutoTypeNormalize[];
  display: boolean
}

export default class ComponentToPrint extends React.PureComponent<ComponentToPrintProps> {

  
  render() {
    const { produtos,display }  = this.props;
    return (
      <div>
        <Impressao display={display} produtos={produtos} />
      </div>
    );
  }
}
