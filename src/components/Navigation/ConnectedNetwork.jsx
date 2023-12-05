import React, { useContext } from 'react'
import Web3Context from '../../context/Web3Context'

const ConnectedNetwork = ()=>{
    const {chainId}=useContext(Web3Context);
    if(chainId===null){
       return <p className=" text-gray-200 p-2 rounded-lg text-s uppercase">Not connected</p>;
    }
    else if (chainId === 5) {
       return <p className="text-white uppercase p-2 rounded-lg text-s">Goerli</p>;
     } else {
       return <p className=" text-rose-600 uppercase p-2 rounded-lg text-s"> Network Not Supported</p>;
     }
 }

export default ConnectedNetwork