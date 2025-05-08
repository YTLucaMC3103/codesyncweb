import React from 'react'
import { VscFiles, VscTerminal } from 'react-icons/vsc'

const Sidebar = () => {
  return (
    <div className="w-12 bg-[#333] flex flex-col items-center py-4 gap-4">
      <VscFiles size={24} />
      <VscTerminal size={24} />
    </div>
  )
}

export default Sidebar
