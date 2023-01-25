import {config as dotEnvConfig, config as dotenvConfig} from 'dotenv';
import type {HardhatUserConfig, NetworkUserConfig} from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-solhint';
import '@nomicfoundation/hardhat-chai-matchers';
import {getChainsData, NetworkShortName} from "./constants/chains";
import {resolve} from "path";
import "./tasks/index";

dotEnvConfig();


dotenvConfig({path: resolve(__dirname, "./.env")});

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
    throw new Error("Please set your MNEMONIC in a .env file");
}

function getChainConfigFromIChain(shortName: NetworkShortName) {
    const chainInfo = getChainsData().find(el => el.short_name === shortName);
    if (!chainInfo) {
        throw new Error(`Unknown chain ${shortName}`);
    }
    const networkUserConfig: NetworkUserConfig = {
        accounts: {
            count: 20,
            mnemonic,
            path: "m/44'/60'/0'/0"
        },
        chainId: chainInfo.chain_id,
        url: chainInfo.rpc_url
    };
    return networkUserConfig;
}

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    solidity: {
        compilers: [{version: '0.8.9', settings: {}}],
    },
    // redirect typechain output for the frontend
    typechain: {
        outDir: './types/typechain',
    },
    networks: {
        hardhat: {
            chainId: 1337
        },
        localhost: {
            chainId: 1337
        },
        rinkeby: getChainConfigFromIChain("rinkeby"),
        goerli: getChainConfigFromIChain("goerli"),
    },
};

export default config;
