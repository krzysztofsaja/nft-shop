import {PlaceCardOrder} from "../../types/cart-order";

export function placeOrder(data: PlaceCardOrder) {
    return fetch('api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
        .then(res => res.json())
        .catch(error => {
            console.error(error);
            return;
        })
}
