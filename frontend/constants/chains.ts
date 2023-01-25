import {goerli, hardhat, localhost} from "wagmi/chains";

const supportedChains = {
    [localhost.id]: true, [hardhat.id]: true, [goerli.id]: true
};

function isSupportedChainId(chainId: number): boolean {
    return !!supportedChains[chainId]
}

export default isSupportedChainId;
