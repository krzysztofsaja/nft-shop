import {ActionIcon, Group, Indicator, Stack, Text} from "@mantine/core";
import {IconShoppingCart} from "@tabler/icons";
import {CartUIContext} from "../../state/cart-ui.state";
import {useContext, useEffect} from "react";
import {ShoppingContext} from "../../state/cart-shopping.state";
import {ProductCartElement} from "./product-cart-element";
import CheckoutButton from "./checkout-cart";
import CartSummarize from "./cart-summarize";
import {useAccount} from "wagmi";


function ProductCart() {
    const {cardUIState, toggleCart} = useContext(CartUIContext);
    const {shoppingState, removeProduct, getTotalPrice, reset} = useContext(ShoppingContext);
    const {isConnected} = useAccount();

    useEffect(() => {
        if (!isConnected) {
            reset();
        }
    }, [isConnected])

    const ShoppingCardIconButton = <ActionIcon
        onClick={toggleCart}
        variant="filled"
        color="gray.0">
        <IconShoppingCart color="black" size="1.6em"/>
    </ActionIcon>;

    return <Stack h="calc(100vh - 32px)" miw={'270px'}>
        <Group position={"apart"} mb="lg">
            {cardUIState.isOpen && <Text weight={700} size="lg">My Card</Text>}
            {shoppingState.products.length &&
              <Indicator color="secondary" label={shoppingState.products.length} inline size={16}>
                  {ShoppingCardIconButton}
              </Indicator>
            }
            {!shoppingState.products.length && ShoppingCardIconButton}
        </Group>
        {cardUIState.isOpen && !shoppingState.products.length && <Group position={"center"}>
          <Text pt='lg' mt='lg' weight={100} size="lg">No items in a basket</Text>
        </Group>}
        {cardUIState.isOpen &&
          <>
            <Stack>
                {shoppingState.products.map((product) => {
                    return <ProductCartElement
                        removeProduct={() => removeProduct(product.id)}
                        product={product}
                        key={product.id}/>
                })}
            </Stack>
            <div style={{flexGrow: 1}}/>
            {!!shoppingState.products.length && <CartSummarize inEth={getTotalPrice()}></CartSummarize>}
            <CheckoutButton></CheckoutButton>
          </>}


    </Stack>
}

export default ProductCart
