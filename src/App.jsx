import { useState } from 'react'
import './App.css'
import Wallet from './components/Wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import StakeAmount from './components/Stake/StakeAmount'
import WithdrawAmount from './components/Withdraw/WithdrawAmount'
import ApproveAmount from './components/Approve/ApproveAmount'
import ClaimAmount from './components/Claim/ClaimAmount'
import "../src/App.css"
import {Toaster} from "react-hot-toast"

function App() {

  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    <div className="w-[100%] h-[100vh] bg-[#1C1C22] radial">
    <div >
      <Wallet>
      <Navigation/>
          <div className="flex flex-col justify-start items-center m-10">
            <div className="flex justify-between mt-4 button-section mb-5 ">
              <button
                onClick={() => handleButtonClick("stake")}
                className={displaySection === "stake" ? "active" : ""}
              >
                Stake
              </button>
              <button
                onClick={() => handleButtonClick("approve")}
                className={displaySection === "approve" ? "active" : ""}
              >
                Approve
              </button>
              <button
                onClick={() => handleButtonClick("withdraw")}
                className={displaySection === "withdraw" ? "active" : ""}
              >
                Withdraw
              </button>
              <button
                onClick={() => handleButtonClick("claim")}
                className={displaySection === "claim" ? "active" : ""}
              >
                Claim
              </button>
            </div>
            {displaySection === "stake" && (
              <div className="w-[500px] rounded-xl  bg-[#34343D]">
                <StakeAmount />
              </div>
            )}
            {displaySection === "approve" && (
              <div className="w-[500px] rounded-xl bg-[#34343D]">
                <ApproveAmount/>
              </div>
            )}
            {displaySection === "withdraw" && (
              <div className="w-[500px] rounded-xl bg-[#34343D]">
                <WithdrawAmount/>
              </div>
            )}
            {displaySection === "claim" && (
              <div className="w-[500px] rounded-xl bg-[#34343D]">
                <ClaimAmount/>
              </div>
            )}
          </div>
      <Toaster className="toast" position="top-center"/>
      </Wallet>
    </div>
    </div>
  )
}

export default App
