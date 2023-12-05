import { useContext,useEffect,useRef, useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useEthxBalance } from "../../utils/useEthxBalance";

const ApproveAmount = () => {

 const {withdrawContract,ethxContract,selectedAccount} = useContext(Web3Context);
 const approveStakeAmountRef = useRef();
 const { ethxBalance, updateBalance } = useEthxBalance();

 const approveToken=async(e)=>{

   e.preventDefault();
   const amount = approveStakeAmountRef.current.value.trim();
 
   if(isNaN(amount) || amount<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }

   const amountToApprove = ethers.parseUnits(amount,18).toString();

   try{
    const approval = await ethxContract.approve(withdrawContract.target,amountToApprove)

    await toast.promise(approval.wait(),
    {
      loading: "Approval is pending...",
      success: 'Approval successful 👌',
      error: 'Approval failed 🤯'
    });

    approveStakeAmountRef.current.value = "";

    } catch (error) {
        if(ethxContract == null){
            toast.error("Connect To Wallet First")
        }else{
            toast.error("Staking Failed");
            console.error(error.message)
        }
    }
  };

    return (
        <form onSubmit={approveToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
        <div className="flex w-[100%] text-white justify-between">
        <label className=" opacity-80 text-s font-normal mb-4">Enter ETHx amount</label>
        <label>My ETHx: {ethxBalance}</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl bg-[#2F2F36] outline-none text-white mb-2" type="text" ref={approveStakeAmountRef} placeholder="0.0" />

       <div className="uppercase text-xs text-gray-200 flex justify-center items-center w-[100%] mt-16">"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>
       <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>
      
       <button onClick={approveToken} type="submit" className=" text-gray-200 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-m px-5 py-5 text-center me-2 mb-2 w-[100%] mt-6 uppercase">Approve Token</button>
      </form>
      )
}

export default ApproveAmount;