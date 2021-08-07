// "SPDX-License-Identifier: no-licence"
pragma solidity ^0.8.0;
import "./ERC721Tradable.sol";

contract MyNft is ERC721Tradable {

    constructor()
        ERC721Tradable(
            "MyNft",
            "MN",
            0xF57B2c51dED3A29e6891aba85459d600256Cf317,
            "https://gas-free-nft.herokuapp.com/getMetaData/"
        )
    {}
}
