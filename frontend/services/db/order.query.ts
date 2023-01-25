import {database} from "./firebase-init";
import {addDoc, collection} from 'firebase/firestore';
import {CartOrder} from "../../types/cart-order";
import {getDocsFromServer} from "@firebase/firestore";

const orders = collection(database, 'orders');

export async function saveOrder(nftOrder: CartOrder) {
    try {
        await addDoc(orders, nftOrder);
        console.log(`Successfully saved JSON object to Firestore`);
    } catch (error) {
        console.error(`Error saving JSON object to Firestore: ${error}`);
    }
}


export async function getOrders() {
    try {
        return getDocsFromServer(orders).then(res => {
            const orders = res.docs.map(el => ({id: el.id, ...el.data()}));
            return orders;
        });
    } catch (error) {
        console.error(`Error fetching orders: ${error}`);
        throw new Error('Failed to fetch orders')
    }
}
