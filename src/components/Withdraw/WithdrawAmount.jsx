import { useContext,useRef, useState , useEffect } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useEthxBalance } from "../../utils/useEthxBalance";

const WithdrawAmount = () => {

 const {withdrawContract , selectedAccount} = useContext(Web3Context);
 const unstakeAmountRef = useRef(); 
 const { ethxBalance } = useEthxBalance();

 const unstakeToken = async (e) => {
  e.preventDefault();

  const amount = unstakeAmountRef.current.value.trim();
  console.log(amount);

  if (isNaN(amount) || amount <= 0) {
    toast.error("Please enter a valid positive number.");
    return;
  }

  const amountToUnstake = ethers.parseUnits(amount, 18).toString();

  try {

    const transactionPromise = new Promise(async (resolve, reject) => {
      try {
        const transaction = await withdrawContract.requestWithdraw(amountToUnstake, selectedAccount);
        const receipt = await transaction.wait();
        resolve(receipt);
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(transactionPromise, {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯',
    });

    unstakeAmountRef.current.value = "";

  } catch (error) {
    if (withdrawContract == null) {
      toast.error("Connect To Wallet First");
    } else {
      toast.error("Transaction Failed 🤯");
      console.error(error.code);
    }
  }
};
    return (
      <form onSubmit={unstakeToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
        <div className="flex w-[100%] text-white justify-between">
        <label className=" opacity-80 text-s font-normal mb-4">Enter ETHx amount</label>
        <label>My ETHx: {ethxBalance}</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl bg-[#2F2F36] outline-none text-white mb-2" type="text" ref={unstakeAmountRef} placeholder="0.0" />

       <div className="uppercase text-xs text-gray-200 flex justify-center items-center w-[100%] px-8 mt-12 text-center">"After successfully unstaking tokens, a request ID will be generated."</div>
       <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>
      
       <button onClick={unstakeToken} type="submit" className=" text-gray-200 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-m px-5 py-5 text-center me-2 mb-2 w-[100%] mt-6 uppercase">UnStake Token</button>
      </form>
       )
}
export default WithdrawAmount;