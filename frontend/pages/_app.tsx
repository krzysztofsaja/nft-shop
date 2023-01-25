import {AppProps} from 'next/app';
import {useState} from 'react';
import Head from 'next/head';
// global styles
import '../styles/globals.scss';
// mantine theming
import myMantineTheme from '../themes/mantine';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import {NotificationsProvider} from '@mantine/notifications';
// web3 connection
import {Chain, configureChains, createClient, mainnet, WagmiConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {goerli, hardhat, localhost, polygonMumbai} from "wagmi/chains";

// create Wagmi client
const myChains: Chain[] = [
    localhost,
    hardhat,
    mainnet,
    goerli,
];
const {chains, provider, webSocketProvider} = configureChains(myChains, [publicProvider()]);
const client = createClient({
    // autoConnect: true,
    connectors: [new MetaMaskConnector({chains})],
    provider,
    webSocketProvider,
});

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        // NOTE: if you want to, set cookie here
    };

    return (
        <>
            <Head>
                <title>NFT Shop POC</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <meta name="description"
                      content="NFT shop Proof of Concept"/>
            </Head>

            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        ...myMantineTheme,
                        colorScheme,
                        // you can change primaryColor w.r.t colorScheme here
                    }}
                >
                    <WagmiConfig client={client}>
                        <NotificationsProvider position={'top-center'}>
                            <ModalsProvider>
                            <Component {...pageProps} />
                            </ModalsProvider>
                        </NotificationsProvider>
                    </WagmiConfig>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}
