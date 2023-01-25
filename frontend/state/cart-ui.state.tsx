import {createContext} from 'react';
import {useLocalStorage} from "@mantine/hooks";

interface CartUIState {
    isOpen: boolean;
}

interface CartContextProps {
    cardUIState: CartUIState;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

export const CartUIContext = createContext<CartContextProps>({
    cardUIState: {isOpen: false},
    toggleCart: () => {
    },
    openCart: () => {
    },
    closeCart: () => {
    }
});

export function CartProvider(props: any) {
    const [cartState, setCartState] = useLocalStorage<CartUIState>({key: 'cardUIState', defaultValue: {isOpen: false}});

    function toggleCart() {
        setCartState({...cartState, isOpen: !cartState.isOpen});
    }

    function closeCart() {
        setCartState({...cartState, isOpen: false});
    }

    function openCart() {
        setCartState({...cartState, isOpen: true});
    }

    return (
        <CartUIContext.Provider value={{cardUIState: cartState, toggleCart, openCart, closeCart}}>
            {props.children}
        </CartUIContext.Provider>
    );
}

