import React from 'react'
import ConnectedAccount from './ConnectedAccount'
import ConnectedNetwork from './ConnectedNetwork'

const Navigation = ()=>{
  return(
    <header className="w-[100%] h-15 p-6 m-0 flex">
    <div className=" text-xs flex flex-row-reverse justify-center items-center gap-3">
      <ConnectedAccount />
      <ConnectedNetwork />
    </div>
  </header>
  )
}

export default Navigation