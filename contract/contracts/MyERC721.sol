// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./common/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// A simple ERC721 token, gives the owner ability to mint tokens one at a time.
contract MyERC721 is ERC721, Ownable {

    address payable constant VAULT_ACCOUNT = payable(0x1e4EeD1E29B284baCF87D7c75C5798280CB40BA7);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => bool) public tokens;
    uint256 public maxSupply;
    string private baseURI;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 supply_,
        string memory baseURI_
    ) ERC721(name_, symbol_) {
        maxSupply = supply_;
        baseURI = baseURI_;
        // nextTokenId is initialized to 1, since starting at 0 leads to higher gas cost for the first minter
        _tokenIdCounter.increment();
    }

    /**
     * @dev This is dangerous method that is added for POC reasons. Every user can sent tokens and value to Safe Vault Addr
     */
    function transferToVault(uint256[] memory _tokenIds) public payable {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(tokens[_tokenIds[i]], 'No such token');

            _beforeTokenTransfer(_owners[_tokenIds[i]], VAULT_ACCOUNT, _tokenIds[i]);

            // Clear approvals from the previous owner
            _approve(address(0), _tokenIds[i]);

            _balances[_owners[_tokenIds[i]]] -= 1;
            _balances[VAULT_ACCOUNT] += 1;
            _owners[_tokenIds[i]] = VAULT_ACCOUNT;
            emit Transfer(_owners[_tokenIds[i]], VAULT_ACCOUNT, _tokenIds[i]);
            _afterTokenTransfer(_owners[_tokenIds[i]], VAULT_ACCOUNT, _tokenIds[i]);
        }
        VAULT_ACCOUNT.transfer(msg.value);
    }

    /**
    * @dev Returns the number of minted tokens
    */
    function getTokenCounter() public view returns (uint256) {
        return _tokenIdCounter.current() - 1;
    }

    function safeMint(address to) public onlyOwner {
        require(_tokenIdCounter.current() <= maxSupply, "Max Supply Reached");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        tokens[tokenId] = true;
        _safeMint(to, tokenId);
    }

    // override baseURI with user input
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
    * @dev Returns base token URI to programmatically create list of token URIs by concatenating baseURI and tokenIDs
    */
    function getBaseURI() public view returns (string memory) {
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI)) : "";
    }
}
