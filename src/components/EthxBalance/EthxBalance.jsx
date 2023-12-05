import React from 'react'
import { useContext,useEffect, useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";


const EthxBalance = () => {

    const {selectedAccount,ethxContract} = useContext(Web3Context);
    const [ethxBalance, setEthxBalance] = useState(0);


    const fetchBalance = async () => {
        try {
          const balance = await ethxContract.balanceOf(selectedAccount);
          const balanceInEther = ethers.formatEther(balance);
          const formattedBalance = parseFloat(balanceInEther) < 1 ? parseFloat(balanceInEther).toFixed(5) : parseFloat(balanceInEther).toFixed(5);
          setEthxBalance(formattedBalance.toString());
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
    
      useEffect(() => {
        if (ethxContract && selectedAccount) {
          fetchBalance();
        }
      }, [ethxContract, selectedAccount]);

  return (
    <label>My ETHx: {ethxBalance}</label>
  )

}

export default EthxBalance