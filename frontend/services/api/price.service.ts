import {utils} from "ethers";
const ETH_PRICE_RATE = 1500;

export async function getEthPriceRate() {
    return ETH_PRICE_RATE;
}

export async function ethPriceInUSD(inEth: string): Promise<string> {
    const formattedEth = utils.formatEther(inEth);
    console.log({formattedEth});

    return Number(+formattedEth * ETH_PRICE_RATE).toString();
}
