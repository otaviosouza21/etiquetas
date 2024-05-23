import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface GlobalContextType {
  planilha: any[] | null;
  setPlanilha: Dispatch<SetStateAction<any[] | null>>;
}

interface GlobalStorageProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalStorage: React.FC<GlobalStorageProps> = ({ children }) => {
  const [planilha, setPlanilha] = useState<any[] | null>(null);

  return (
    <GlobalContext.Provider value={{ planilha, setPlanilha }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
