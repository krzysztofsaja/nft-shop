import {AppShell, Box, Container, Group, Header as MantineHeader, Navbar, Stack, Text, Title} from '@mantine/core';
import type {FC} from 'react';
import {useContext, useEffect} from "react";
import Footer from './layout/footer';
import {CartUIContext} from "../state/cart-ui.state";
import ProductCart from "./product-cart/product-cart";
import Header from "./layout/header";
import {useAccount, useNetwork, useSigner} from "wagmi";
import {MyERC721__factory} from "../types/typechain";
import getContractAddress from "../constants/addresses";
import {notify, notifyError} from "../utils/notify";
import {truncateAddress} from "../utils/utility";
import ProductGallery from "./product-gallery/product-gallery";
import {ContractContext} from "../state/contract.state";
import {BigNumber, ethers} from "ethers";
import {CollectionInfo} from "../types/collection-info.type";
import {formatUnits} from "ethers/lib/utils";
import WalletConnectionButton from "./wallet/wallet-connection-button";

const NftShopContainer: FC = () => {
    const {cardUIState} = useContext(CartUIContext);
    const {contractState, setContract, setCollectionInfo} = useContext(ContractContext);
    const {isConnected} = useAccount();

    const {data} = useSigner();
    const {chain} = useNetwork();
    const {address} = useAccount();

    // wallet related effects
    useEffect(() => {
        if (data && chain) {
            try {
                const contractAddress = getContractAddress('MyERC721', chain.id);
                console.log("Connected to contract", contractAddress);
                setContract(MyERC721__factory.connect(contractAddress, data));
            } catch (e: any) {
                notifyError(e, 'Contract Not Found', true);
            }
        }

        return () => {
            setContract(undefined);
        };
    }, [data, chain]);

    // contract related effects
    useEffect(() => {
        if (!contractState.contract) return;
        Promise.all([
            contractState.contract.name().catch(e => {
                notifyError(e, 'Failed to get token name');
                throw e;
            }),
            contractState.contract.symbol().catch(e => {
                notifyError(e, 'Failed to get token symbol');
                throw e;
            }),
            contractState.contract.maxSupply().catch(e => {
                notifyError(e, 'Failed to retrieving max supply');
                throw e;
            }),
            contractState.contract.getBaseURI().catch(e => {
                notifyError(e, 'Failed to get base uri');
                throw e;
            }),
            contractState.contract.getTokenCounter().catch(e => {
                notifyError(e, 'Failed to get token counter');
                throw e;
            }),
        ])
            .then(results => {
                let [name, symbol, maxSupply, baseURI, minted] = results;
                const collectionInfo: CollectionInfo = {
                    maxSupply: BigNumber.from(maxSupply).toNumber(),
                    name,
                    symbol,
                    baseURI,
                    minted: BigNumber.from(minted).toNumber()
                };
                setCollectionInfo(collectionInfo);
            })
            .catch(e => notifyError(e, 'Failed to retrieving tokenInfo', true));
    }, [contractState.contract]);


    // account & token related effects
    useEffect(() => {
        if (!contractState.contract || !address) return;

        const listenTransfer: ethers.providers.Listener = (from: string, to: string, value: BigNumber) => {
            if (from == address) {
                notify(
                    'Transfer',
                    `Sent ${formatUnits(value)} ${contractState.collectionInfo.symbol} to ${truncateAddress(to)}`,
                    'info'
                );
            }
        };
        const listenApproval: ethers.providers.Listener = (owner: string, spender: string, value: BigNumber) => {
            notify(
                'Approval',
                `${truncateAddress(owner)} gave ${formatUnits(value)} ${contractState.collectionInfo.symbol} allowance.`,
                'info'
            );
        };

        contractState.contract.on(contractState.contract.filters.Transfer(address, null), listenTransfer);
        contractState.contract.on(contractState.contract.filters.Transfer(null, address), listenTransfer);
        contractState.contract.on(contractState.contract.filters.Approval(null, address), listenApproval);

        return () => {
            if (!contractState.contract) {
                return;
            }
            contractState.contract.off(contractState.contract.filters.Transfer(address, null), listenTransfer);
            contractState.contract.off(contractState.contract.filters.Transfer(null, address), listenTransfer);
            contractState.contract.off(contractState.contract.filters.Approval(null, address), listenApproval);
        };
    }, [contractState.contract, address, contractState.collectionInfo.symbol]);


    return (
        <AppShell
            styles={theme => ({main: {paddingLeft: 0, paddingRight: cardUIState.isOpen ? 300 : 60}})}
            layout="alt"
            aside={
                <Navbar
                    position={{top: 0, right: 0}}
                    sx={(theme) => ({
                            height: '100vh',
                            boxSizing: 'border-box',
                            overflow: "hidden",
                            transition: "width 300ms ease, min-width 300ms ease",
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
                        }
                    )}
                    width={{base: cardUIState.isOpen ? '100%' : 60, sm: cardUIState.isOpen ? 300 : 60}}
                    p="md">
                    <ProductCart></ProductCart>
                </Navbar>
            }
            header={<MantineHeader
                mr={cardUIState.isOpen ? 300 : 60}
                sx={{left: 0}}
                fixed={false}
                position={{top: 0, left: 0}}
                height={{xs: 60, base: 100}}
                p="xs">
                <Header/>
            </MantineHeader>}
        >
            <Stack>
                <Container>
                    {contractState.collectionInfo.name && isConnected ? <>
                            <Box my="xl">
                                <Title>{contractState.collectionInfo.name} ({contractState.collectionInfo.symbol})</Title>
                                <Group position={'left'}>
                                    <Text>
                                        <b>Total Supply:</b> {contractState.collectionInfo.maxSupply} tokens
                                    </Text>
                                    <Text> <b>Minted:</b> {contractState.collectionInfo.minted} tokens </Text>
                                </Group>
                            </Box>
                            <ProductGallery></ProductGallery>
                        </> :
                        <Box sx={{textAlign: 'center', margin: 'auto'}} my="xl" py="xl">
                            <Title>Please connect your wallet</Title>
                            <Text>
                                <b>Supported networks:</b> Goerli
                            </Text>
                            <Box mt={'lg'}>
                                <WalletConnectionButton></WalletConnectionButton>
                            </Box>
                        </Box>}

                </Container>
                <div style={{flexGrow: 1}}/>
                <Footer/>
            </Stack>
        </AppShell>
    );
};

export default NftShopContainer;
