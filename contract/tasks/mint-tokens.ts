import {BigNumber} from "ethers";
import {task} from "hardhat/config";
import {Signer} from "@ethersproject/abstract-signer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {MyERC721, MyERC721__factory} from "../types/typechain";

task("mint", "")
    .addParam("contract")
    .setAction(async (taskArgs, hre) => {
        const GAS_LIMIT = "538789";
        const minterAddress = taskArgs.contract;
        const gasLimit = BigNumber.from(GAS_LIMIT),

            accounts: Signer[] = await hre.ethers.getSigners();
        const erc721MinterFactory: MyERC721__factory = <MyERC721__factory>(
            await hre.ethers.getContractFactory("MyERC721")
        );
        const erc771Minter: MyERC721 = await erc721MinterFactory.attach(minterAddress);
        try {
            await erc771Minter.safeMint(await accounts[0].getAddress(), {gasLimit});
            console.log('Token was minted successfully')
        } catch (e) {
            console.error(e);
        }
    });
