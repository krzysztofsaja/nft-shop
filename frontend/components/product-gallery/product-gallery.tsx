import {ProductGalleryElement} from "./product-gallery-element";
import {Grid} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {ShoppingContext} from "../../state/cart-shopping.state";
import {CartUIContext} from "../../state/cart-ui.state";
import {NftProduct} from "../../types/nft-product.type";
import {ContractContext} from "../../state/contract.state";
import {useAccount} from "wagmi";

function ProductGallery() {
    const {shoppingState, addProduct, isInCart} = useContext(ShoppingContext);
    const {cardUIState, openCart, closeCart} = useContext(CartUIContext);
    const {contractState} = useContext(ContractContext);
    const [products, setNFTProduct] = useState<NftProduct[]>([]);
    const {isConnected} = useAccount();

    useEffect(() => {
        if (!shoppingState.products.length && cardUIState.isOpen) {
            closeCart();
        }
        if (shoppingState.products.length && !cardUIState.isOpen) {
            openCart();
        }
    }, [shoppingState.products])

    useEffect(() => {
        if (contractState.collectionInfo.minted > 0 && isConnected) {
            const products: NftProduct[] = [];
            for (let i = 0; i < contractState.collectionInfo.minted; i++) {
                products.push({
                    id: i + 1,
                    price: '010000000000000000',
                    desc: 'Test',
                    img: 'https://i.imgur.com/ZL52Q2D.png',
                    title: `#${ i+ 1} ${contractState.collectionInfo.name}`
                })
            }
            setNFTProduct(products)
        } else {
            setNFTProduct([])
        }
    }, [contractState.collectionInfo.minted, isConnected])

    return <Grid grow gutter={5} gutterXs="md">
        {products.map((product, index) => {
            return <Grid.Col key={product.id} md={6} lg={3}><ProductGalleryElement
                addProduct={() => addProduct(product)}
                isInCart={isInCart(product.id)}
                product={product}
                key={index}/></Grid.Col>
        })}
    </Grid>;
}

export default ProductGallery;
