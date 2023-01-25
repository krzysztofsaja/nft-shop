import {task} from "hardhat/config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {MyERC721, MyERC721__factory} from "../types/typechain";
import constants from "../constants";

task("deploy", "Deploying smart contract", async (_taskArgs, hre) => {
  const factory: MyERC721__factory = <MyERC721__factory>await hre.ethers.getContractFactory("MyERC721");
  const signerWithAddress = await hre.ethers.getSigners();

  try {
    console.log("Start deploying....");
    const myERC721: MyERC721 = await factory.deploy(
        constants.MyERC721.name,
        constants.MyERC721.symbol,
        constants.MyERC721.supply,
        constants.MyERC721.baseURI,
      { gasLimit: "9800000"}
    );
    console.log("Reading contract result....");
    const result = await myERC721.deployed();

    console.log("Erc721Minter deployed to: ", result.address);
  } catch (e) {
    console.error("Deploying error!");
    console.error(e);

    console.log(`Singer admin balance: ${await signerWithAddress[0].getBalance()}`);
  }
});
