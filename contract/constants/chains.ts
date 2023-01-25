import {config as dotenvConfig} from "dotenv";
import {resolve} from "path";

export type NetworkShortName =
    | "localhost"
    | "hardhat"
    | "ethereum"
    | "rinkeby"
    | "goerli"
    | "polygon"
    | "mumbai";

export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
}


export interface IChainData {
  name: string;
  short_name: NetworkShortName;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
  rpc_explorer?: string;
}

dotenvConfig({ path: resolve(__dirname, "../.env") });
const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
const alchemyApiKey: string | undefined = process.env.ALCHEMY_KEY;

if (!infuraApiKey) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
}
if (!alchemyApiKey) {
  throw new Error("Please set your ALCHEMY_KEY in a .env file");
}

const supportedChains: IChainData[] = [
  {
    name: "Hardhat",
    short_name: "hardhat",
    chain: "ETH",
    network: "hardhat",
    chain_id: 31337,
    network_id: 31337,
    rpc_url: "http://127.0.0.1:8545",
    rpc_explorer: "https://etherscan.io/tx/",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: ""
    }
  },
  {
    name: "Localhost",
    short_name: "localhost",
    chain: "ETH",
    network: "localhost",
    chain_id: 31337,
    network_id: 31337,
    rpc_url: "http://127.0.0.1:8545",
    rpc_explorer: "https://etherscan.io/tx/",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: ""
    }
  },
  {
    name: "Ethereum Mainnet",
    short_name: "ethereum",
    chain: "ETH",
    network: "mainnet",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    rpc_explorer: "https://etherscan.io/tx/",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: ""
    }
  },
  {
    name: "Ethereum Rinkeby",
    short_name: "rinkeby",
    chain: "ETH",
    network: "rinkeby",
    chain_id: 4,
    network_id: 4,
    rpc_explorer: "https://rinkeby.etherscan.io/tx/",
    rpc_url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: ""
    }
  },
  {
    name: "Ethereum Görli",
    short_name: "goerli",
    chain: "ETH",
    network: "goerli",
    chain_id: 5,
    network_id: 5,
    rpc_url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    rpc_explorer: "https://goerli.etherscan.io/tx/",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: ""
    }
  },
  {
    name: "Polygon Mumbai Testnet",
    short_name: "mumbai",
    chain: "MATIC",
    network: "mumbai",
    chain_id: 80001,
    network_id: 80001,
    rpc_explorer: "https://mumbai.polygonscan.com/tx/",
    // rpc_url: "https://matic-mumbai.chainstacklabs.com",
    rpc_url: "https://matic-mumbai.chainstacklabs.com",
    native_currency: {
      symbol: "MATIC",
      name: "Matic",
      decimals: "18",
      contractAddress: ""
    }
  }
];

export function getChainsData(): IChainData[] {
  return supportedChains;
}
