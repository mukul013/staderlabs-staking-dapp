import { useContext,useEffect,useRef, useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useEthxBalance } from "../../utils/useEthxBalance";

const StakeAmount = () => {

 const {stakingContract , selectedAccount,ethxContract} = useContext(Web3Context);
 const stakeAmountRef = useRef();
 const [ethAmount, setEthAmount] = useState(0);
 const { ethxBalance, updateBalance } = useEthxBalance();

  const handleAmountChange = (e) => {
    const amount = e.target.value.trim();

    const amountToConvert = (amount*(1/1.015151)).toFixed(6);

    setEthAmount(amountToConvert);
  };

 const stakeToken=async(e)=>{
   e.preventDefault();
   const amount = stakeAmountRef.current.value.trim();

   if(isNaN(amount) || amount<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }

   const amountToStake = ethers.parseUnits(amount,18).toString();

   try{
    const transaction = await stakingContract.deposit(selectedAccount,selectedAccount,{value: amountToStake}); 
    await toast.promise(transaction.wait(),
    {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯'
    });

    stakeAmountRef.current.value = "";
    await updateBalance();

    } catch (error) {
      if(stakingContract == null){
        toast.error("Connect To Wallet First")
      }else{
        toast.error("Staking Failed");
      }
    }
  };

    return (
      <form onSubmit={stakeToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
        <div className="flex w-[100%] text-white justify-between">
        <label className=" opacity-80 text-s font-normal mb-4">Enter ETH amount</label>
        <label>My ETHx: {ethxBalance}</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl bg-[#2F2F36] outline-none text-white" type="text" ref={stakeAmountRef} placeholder="0.0"  onChange={handleAmountChange}/>
        <div className="flex justify-between text-gray-300 w-[100%] mt-5 font-normal">
        <label >You will get:</label>
        <label>{ethAmount} ETHx</label>
       </div>
       <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>
       <div className="flex justify-between text-gray-300 w-[100%] mt-5 font-extralight">
          <label>Exchange rate</label>
          <label>1 ETHx = 1.015151 ETH</label>
       </div>
       <button onClick={stakeToken} type="submit" className=" text-gray-200 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-m px-5 py-5 text-center me-2 mb-2 w-[100%] mt-6 uppercase">Stake Token</button>
      </form>
       )
}
export default StakeAmount;