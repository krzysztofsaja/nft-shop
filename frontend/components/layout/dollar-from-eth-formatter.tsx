import {utils} from "ethers";
import DollarFormatter from "./dollar-formatter";
const ETH_PRICE_RATE = 1500;

function DollarFromEth({inEth}: {inEth: string}) {
    const formattedEth = utils.formatEther(inEth);
    const amount = Number(+formattedEth * ETH_PRICE_RATE).toString();
    return <DollarFormatter amount={amount} />
}

export default DollarFromEth;
