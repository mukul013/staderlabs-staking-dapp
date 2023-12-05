import { useContext,useEffect,useRef } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import EthxBalance from "../EthxBalance/EthxBalance";
import { useRequestIds } from "../../utils/useRequestIds";

const ClaimAmount = () => {

 const {withdrawContract} = useContext(Web3Context);
 const claimAmountRef = useRef();
 const {requestIds, finalizedRequestId , updateRequestIds} = useRequestIds();
 
 const cliamToken=async(e)=>{

   e.preventDefault();

   const requestID = claimAmountRef.current.value.trim();

   if(isNaN(requestID) || requestID<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }
   
   try{
    const transaction = await withdrawContract.claim(requestID);

    await toast.promise(transaction.wait(),
    {
      loading: "Claim is pending...",
      success: 'Claim successful 👌',
      error: 'Claim failed 🤯'
    });

    claimAmountRef.current.value = "";
    await updateRequestIds();

    } catch (error) {
        console.log("requesttstca " ,requestIds)
        if(!requestIds.split(",").includes(requestID)){
          toast.error("Enter Correct Request Id 😡");
        }
        else if(finalizedRequestId <= requestID){
          toast.error("Request Id is not Finalized 🙅🏻");
        }else{
          toast.error("Claim Failed 🤯");
          console.error(error.message)
        }
    }
  };
    return (
       <form onSubmit={cliamToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
        <div className="flex w-[100%] text-white justify-between">
        <label className=" opacity-80 text-s font-normal mb-4">Enter Request ID</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl bg-[#2F2F36] outline-none text-white" type="text" ref={claimAmountRef} placeholder="0" />
        <div className="mt-7 w-[100%] text-center">{requestIds.length >= 1 ? <div><span className="uppercase text-gray-200 font-medium">Request Id :</span>{' '}<span className="text-white font-extralight">{requestIds.split(",").reverse().join(",")}</span></div> : <div className="mt-6"></div>}</div>
        <div className="uppercase text-xs text-gray-200 flex justify-center items-center w-[100%] mt-5">"Claim only after your request ID is finalized."</div>
       <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>
      
       <button onClick={cliamToken} type="submit" className=" text-gray-200 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-m px-5 py-5 text-center me-2 mb-2 w-[100%] mt-6 uppercase">Claim Token</button>
      </form>
    )
}
export default ClaimAmount;