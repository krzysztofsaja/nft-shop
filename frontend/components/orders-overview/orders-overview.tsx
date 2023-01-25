import {Table} from "@mantine/core";
import {useEffect, useState} from "react";
import {CartOrder} from "../../types/cart-order";
import {getOrders} from "../../services/api";

function OrdersOverview() {
    const [ordersRows, setOrdersRow] = useState<JSX.Element[]>();
    useEffect(() => {
        getOrders().then(orders => {
            setOrdersRow(orders
                .sort((x, y) => {
                    if (new Date(x.createdAt) < new Date(y.createdAt)) {
                        return 1;
                    } else if (new Date(x.createdAt) > new Date(y.createdAt)) {
                        return -1;
                    } else {
                        return 0
                    }
                })
                .map((element: CartOrder) => (
                    <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.createdAt}</td>
                        <td>{element.chainId}</td>
                        <td>{element.txHash}</td>
                        <td>{element.products.length}</td>
                    </tr>
                )))
        })
    }, []);

    return (
        <Table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Created Date</th>
                <th>Chain Id</th>
                <th>Chain TX</th>
                <th>Products</th>
            </tr>
            </thead>
            <tbody>{ordersRows}</tbody>
        </Table>
    );
}

export default OrdersOverview;
