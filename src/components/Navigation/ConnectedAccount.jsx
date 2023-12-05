import React, { useContext, useState } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedAccount = () => {
  const { selectedAccount } = useContext(Web3Context);

  const maxDisplayLength = 10; // Set the maximum number of characters to display initially
  const [showFullAddress, setShowFullAddress] = useState(false);

  // Check if selectedAccount exists before manipulating its value
  const truncatedAddress = showFullAddress
    ? selectedAccount
    : selectedAccount
    ? `${selectedAccount.substring(0, maxDisplayLength)}`
    : null;

  const toggleAddressDisplay = () => {
    setShowFullAddress(!showFullAddress);
  };

  return (
    <div className='flex text-gray-200'>
      {/* <p className=" text-gray-200 uppercase p-2 rounded-lg text-s">
            {selectedAccount ? selectedAccount : "Connect Account"}
          </p> */}
      <p className="uppercase p-2 rounded-lg text-s">
        {truncatedAddress ? truncatedAddress : "Connect Account"}
      </p>
      {selectedAccount && (
        <button onClick={toggleAddressDisplay}>
          {showFullAddress ? '' : '→'}
        </button>
      )}
    </div>
  );
};

export default ConnectedAccount;
