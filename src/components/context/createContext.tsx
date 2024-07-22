import { createContext, useState, FC, ReactNode, useContext } from "react";
import { Product } from "../shoppingCart/types";


type CartContextType = {
    cartData: Product[];
    setCartData: React.Dispatch<React.SetStateAction<Product[]>>;
};

const CreateCartContext = createContext<CartContextType>({
    cartData: [],
    setCartData: () => { },
});

type ContextProviderProps = {
    children: ReactNode;
};

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [cartData, setCartData] = useState<Product[]>([]);

    return (
        <CreateCartContext.Provider value={{ cartData, setCartData }}>
            {children}
        </CreateCartContext.Provider>
    );
};

export const GetContext = () => {
    return useContext(CreateCartContext)
}

