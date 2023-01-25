import {NftProduct} from "./nft-product.type";

export interface CartOrder {
    id: string;
    createdAt: string;
    products: NftProduct[];
    txHash: string;
    chainId: number;
}

export type PlaceCardOrder = Omit<CartOrder, 'id'>;
