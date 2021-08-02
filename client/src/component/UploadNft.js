import React, { useState,useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { abi, contractAddress } from "../contracts/MyNft";

export default function UploadNft() {

  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        if (Web3.givenProvider) {
          const web3 = new Web3(Web3.givenProvider);
          setWeb3(web3);
          // await Web3.givenProvider.enable();
          await window.ethereum.request({ method: "eth_requestAccounts" });

          let contract = new web3.eth.Contract(abi, contractAddress);

          setContract(contract);
        } else {
          alert("please install metamask");
        }
      } catch (e) {
        alert(`Error: ${e}`);
      }
    }
    fetchData();
  }, []);

  let [imgBuffer, setImageBuffer] = useState("");

  const showFile = async (e) => {
    e.preventDefault();
    setImageBuffer(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imgBuffer);
    try {
      let response = await axios.post(
        "https://gas-free-nft.herokuapp.com/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await contract.methods
      .mint(window.ethereum.selectedAddress)
      .send({ from: window.ethereum.selectedAddress }).on("receipt", async (transfer) => {
     
        const transferTx = await contract.getPastEvents("Transfer", {
          fromBlock: 0,
          toBlock: "latest"
        });
        
        mintToken(response.data.img_url,transferTx[transferTx.length-1].returnValues.tokenId);
      })
    
      } catch (error) {
      alert(error);
    }
  };

  const mintToken = async(hash,id) => {
    const data = {
      name: document.getElementById("name").value,
      image: hash,
      id,
      description: document.getElementById("description").value,
      attributes: [
        {
          trait_type: "Area",
          value: document.getElementById("area").value,
        },
        {
          trait_type: "Location",
          value: document.getElementById("location").value,
        },
        {
          trait_type: "Country",
          value: document.getElementById("country").value,
        },
        {
          trait_type: "Rarity",
          value: parseInt(document.getElementById("rarity").value),
        },
      ],
    }

  let response = await axios.post("https://gas-free-nft.herokuapp.com/api/metaData/",data)

  console.log("Response--------->",response.data)
  };

  return (
    <div>
      
        <div style={{ marginTop: 60 }}>
          <div>
            Name: <input id="name" />
          </div>
          <div>
            Area: <input id="area" />
          </div>
          <div>
            Location: <input id="location" />
          </div>

          <div>
            Rarity: <input id="rarity" />
          </div>
          <div>
            Country: <input id="country" />
          </div>
          
          <div>
            description: <input id="description" />
          </div>
          <input onChange={(e) => showFile(e)} type="file" id="file1" />
          <button type="submit" className="btn btn-success" onClick={uploadImage}>
            submit
          </button>
          
        </div>
  
    </div>
  );
}
