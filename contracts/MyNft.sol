// "SPDX-License-Identifier: MIT"
pragma solidity ^0.8.0;
import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyNft is ERC721Tradable {
    using Strings for uint256;
    // mapping(uint256 => string) private _tokenURIs;

    constructor()
        ERC721Tradable(
            "MyNft",
            "MN",
            0xF57B2c51dED3A29e6891aba85459d600256Cf317,
            "https://gas-free-nft.herokuapp.com/getMetaData/"
        )
    {}

    // function setTokenURI(uint256 tokenId, string memory _tokenURI)
    //     public
    //     onlyOwner
    // {
    //     require(_exists(tokenId), "URI set of nonexistent token");
    //     _tokenURIs[tokenId] = _tokenURI;
    // }

    // function tokenURI(uint256 tokenId)
    //     public
    //     view
    //     override
    //     returns (string memory)
    // {
    //     require(
    //         _exists(tokenId),
    //         "ERC721Metadata: URI query for nonexistent token"
    //     );

    //     string memory baseURI = _baseURI();
    //     return
    //         bytes(baseURI).length > 0
    //             ? string(abi.encodePacked(baseURI, tokenId.toString()))
    //             : _tokenURIs[tokenId];
    // }
}
