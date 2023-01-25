import type {NextPage} from 'next';
import NftShopContainer from '../components/nft-shop-container';
import {CartProvider} from "../state/cart-ui.state";
import {ShoppingProvider} from "../state/cart-shopping.state";
import {ContractProvider} from "../state/contract.state";

const Shop: NextPage = () => {
    return (
        <CartProvider>
            <ContractProvider>
                <ShoppingProvider>
                    <NftShopContainer/>
                </ShoppingProvider>
            </ContractProvider>
        </CartProvider>
    );
};

export default Shop;
