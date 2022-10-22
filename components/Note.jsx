import React from 'react'

const Note = (props) => {
  return (
    <div className="w-96 min-h-[80px] bg-[#1e293b] text-white text-sm px-4 py-2 rounded-md my-5">{props.note}</div>
  )
}

export default Note