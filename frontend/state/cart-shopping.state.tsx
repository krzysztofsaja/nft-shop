import {createContext} from 'react';
import {useLocalStorage} from "@mantine/hooks";
import {NFTId, NftProduct} from "../types/nft-product.type";
import {removeProperty} from "../helpers";
import {BigNumber} from "ethers";


interface ShoppingState {
    products: NftProduct[];
    ids: Record<NFTId, NftProduct>;
    loading: boolean;
}

interface ShoppingContextProps {
    shoppingState: ShoppingState;
    addProduct: (product: NftProduct) => void;
    reset: () => void;
    getTotalPrice: () => string;
    setLoading: (isLoading: boolean) => void;
    removeProduct: (productId: NFTId) => void;
    isInCart: (productId: NFTId) => boolean;
}

export const ShoppingContext = createContext<ShoppingContextProps>({
    shoppingState: {
        products: [],
        ids: {},
        loading: false
    },
    reset: () => {
    },
    getTotalPrice: () => {
        return ''
    },
    setLoading: (isLoading: boolean) => {
    },
    addProduct: (product: NftProduct) => {
    },
    removeProduct: (productId: NFTId) => {
    },
    isInCart: (productId: NFTId) => false,
});

export function ShoppingProvider(props: any) {
    const [state, setCartState] = useLocalStorage<ShoppingState>({
        key: 'cardProductState',
        defaultValue: {products: [], ids: {}, loading: false}
    });

    function reset() {
        setCartState({products: [], ids: {}, loading: false})
    }

    function getTotalPrice(): string {
        return state.products
            .reduce((prev, curr) => {
                return BigNumber.from(prev).add(BigNumber.from(curr.price))
            }, BigNumber.from(0)).toString()
    }

    function addProduct(product: NftProduct) {
        setCartState({
            ...state,
            products: [...state.products, product],
            ids: {...state.ids, [product.id]: product}
        });
    }

    function setLoading(isLoading: boolean) {
        setCartState({
            ...state,
            loading: isLoading
        });
    }

    function isInCart(productId: NFTId): boolean {
        return state.ids && !!state.ids[productId];
    }

    function removeProduct(id: number) {
        const foundIndex = state.products.findIndex(product => product.id === id);
        let newProducts = [...state.products];
        let newIds = {...state.ids}
        if (foundIndex > -1) {
            newProducts.splice(foundIndex, 1);
            newIds = removeProperty(newIds, id);
        }
        setCartState({...state, products: newProducts, ids: newIds});
    }

    return (
        <ShoppingContext.Provider
            value={{shoppingState: state, reset, addProduct, setLoading, getTotalPrice, removeProduct, isInCart}}>
            {props.children}
        </ShoppingContext.Provider>
    );
}

