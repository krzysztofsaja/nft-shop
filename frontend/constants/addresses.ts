import {ethers} from 'ethers';
import {goerli, hardhat, localhost} from 'wagmi/chains';

/**
 * Contract addresses for each ChainID.
 * These can also be read from .env
 */
const contractAddresses: Readonly<{[contractName: string]: {[chainId: number]: string | undefined}}> = {
  MyERC721: {
    [localhost.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [hardhat.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [goerli.id]: '0x5B59819A22E5Fa7ee482a49069773AAf8d3c69E2',
  },
};

/**
 * Gets the contract address, with respect to the contract name and chainId.
 *
 * @param {string} contractName name of the contract you want to connect
 * @param {number} chainId chainId of the chain where the contract is deployed at (e.g. 31337)
 * @throws
 *  if contract name does not exist,
 *  if the chainId is not listed under the contract name,
 *  if the address is explicitly undefined,
 *  if the address format is invalid
 */
function getContractAddress(contractName: string, chainId: number): string {
  // check if contract name is in the list
  if (!(contractName in contractAddresses)) throw new Error('No such contract: ' + contractName);

  // check if contract address is added
  if (!(chainId in contractAddresses[contractName])) throw new Error('Contract not in chainId: ' + chainId);

  const addr = contractAddresses[contractName][chainId];

  // you might intentionally set address to undefined during development
  if (addr == undefined) throw new Error('Address not yet defined.');
  if (!ethers.utils.isAddress(addr)) throw new Error('Invalid address format.');

  return addr;
}

export default getContractAddress;
