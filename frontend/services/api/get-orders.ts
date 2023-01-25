import {CartOrder} from "../../types/cart-order";

export function getOrders(): Promise<CartOrder[]> {
    return fetch('api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => res.json())
        .catch(error => {
            console.error(error);
            return [];
        })
}
