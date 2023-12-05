import { useContext, useEffect, useState } from 'react';
import Web3Context from '../context/Web3Context';
import {ethers} from "ethers"

export const useEthxBalance = () => {

  const { selectedAccount, ethxContract , chainId } = useContext(Web3Context);
  const [ethxBalance, setEthxBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const balance = await ethxContract.balanceOf(selectedAccount);
      const balanceInEther = ethers.formatEther(balance);
      const formattedBalance = parseFloat(balanceInEther).toFixed(6);
      console.log("MY FORMATTED BALANCE " , formattedBalance)
      setEthxBalance(formattedBalance.toString());
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const updateBalance = async () => {
    if (ethxContract && selectedAccount && chainId == 5) {
      await fetchBalance();
    }else{
        setEthxBalance(0);
    }
  };

  useEffect(() => {
    updateBalance();
  }, [ethxContract, selectedAccount , chainId]);

  return { ethxBalance , updateBalance };
};
