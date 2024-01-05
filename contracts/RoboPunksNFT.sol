// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RoboPunksNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunksNFT", "RPNFT") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 100;
        maxPerWallet = 20;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string memory _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Token not minted");
        return string(abi.encodePacked(baseTokenUri, _tokenId.toString(), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "Minting not enabled");
        require(msg.value == quantity_ * mintPrice, "Incorrect value");
        require(totalSupply + quantity_ <= maxSupply, "Max supply reached");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "Max per wallet reached");

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 tokenId = totalSupply + i;
            totalSupply++;
            _safeMint(msg.sender, tokenId);
        }
    }
}
