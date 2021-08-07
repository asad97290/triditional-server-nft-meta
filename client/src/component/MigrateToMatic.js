import React, { useEffect, useState } from "react";
import { MaticPOSClient } from "@maticnetwork/maticjs";
import {contractAddress} from "../contracts/MyNft"

export default function MigrateToMatic() {
  const [from, setFrom] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [maticPOSClient, setMaticPOSClient] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const provider = window.ethereum;
    const from = window.ethereum.selectedAddress();
    const maticPOSClient = new MaticPOSClient({
      network: "testnet",
      version: "mumbai",
      provider,
      posERC721Predicate: "0x74D83801586E9D3C4dc45FfCD30B54eA9C88cf9b"
    });
    setMaticPOSClient(maticPOSClient);
    setFrom(from);
  }

  async function approve(tokenId) {
    await maticPOSClient.approveERC721ForDeposit(contractAddress, tokenId, { from });
  }

  async function deposite( tokenId) {
    await maticPOSClient.depositERC721ForUser(contractAddress, from, tokenId, {
      from,
      gasPrice: "10000000000",
    });
  }

  return <div>
      <h3>Approve Token</h3>
      <label>Token Id</label>
      <input type="text" onChange={(e)=>setTokenId(e.target.value)}/>
      <button onClick={approve(tokenId)}>approve</button>
      <button onClick={deposite(tokenId)}>deposite</button>

  </div>;
}
