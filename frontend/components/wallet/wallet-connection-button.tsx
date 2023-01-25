import {Button} from '@mantine/core';
import {FC} from 'react';
import {useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from 'wagmi';
import {goerli, hardhat, localhost} from "wagmi/chains";
import isSupportedChainId from "../../constants/chains";

const WalletConnectionButton: FC = () => {
    const {isConnected} = useAccount();
    const {connect, connectors} = useConnect();
    const {disconnect} = useDisconnect();
    const { chain } = useNetwork()
    const network =
        useSwitchNetwork({chainId: goerli.id})

    return (
        <>
            {!isConnected || chain && isSupportedChainId(chain?.id) ? <Button
                onClick={() => (isConnected ? disconnect() : connect({connector: connectors[0]}))}
                variant="gradient"
                gradient={{from: 'secondary', to: 'primary', deg: 42}}
            >
                {isConnected ? 'Disconnect' : 'Connect'}
            </Button> : <Button
                onClick={() => (network.switchNetwork ? network.switchNetwork() : {})}
                variant="gradient"
                gradient={{from: 'primary', to: 'secondary', deg: 42}}
            >
                Switch to Goerli
            </Button>}
        </>
    );
};

export default WalletConnectionButton;
