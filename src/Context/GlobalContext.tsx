import React, {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useContext,
  } from "react";
  import { planProdutoTypeNormalize } from "../Functions/normalizeData";
  
  // Define the type for the context value
  export interface GlobalContextType {
    planilha: planProdutoTypeNormalize[] | null;
    setPlanilha: Dispatch<SetStateAction<any[] | null>>;
  }
  
  // Define the type for the props that will be passed to the provider component
  interface GlobalStorageProps {
    children: ReactNode;
  }
  
  // Create the context with an initial undefined value
  export const GlobalContext = createContext<GlobalContextType | undefined>(
    undefined
  );
  
  // Create the provider component
  export const GlobalStorage: React.FC<GlobalStorageProps> = ({ children }) => {
    // Initialize the state with null or an appropriate initial value
    const [planilha, setPlanilha] = useState<planProdutoTypeNormalize[] | null>(
      null
    );
  
    return (
      <GlobalContext.Provider value={{ planilha, setPlanilha }}>
        {children}
      </GlobalContext.Provider>
    );
  };
  
  // Export a custom hook for easier context usage
  export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
      throw new Error("useGlobalContext must be used within a GlobalStorage");
    }
    return context;
  };
  
  export default GlobalContext;
  