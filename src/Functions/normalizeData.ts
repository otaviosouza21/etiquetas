export interface planProdutoTypeNormalize {
    codigo: string;
    descricao: string;
    preco: number;
    quantidade?:number | null
  }
  
  export interface planProdutoType {
    ["Código"]: string;
    ["Preço"]: number;
    ["Produto"]: string;
  }

  export function normalizeData(produto : planProdutoType): planProdutoTypeNormalize{

    const produtoNormalizado: planProdutoTypeNormalize={
        codigo: produto['Código'],
        preco: produto['Preço'],
        descricao: produto['Produto']
    }
    
    return produtoNormalizado
  }