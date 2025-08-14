import React from 'react'

const HighLightText = (props) => {
  return (
    <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-purple-600 rounded-lg`}>
        {" "}
        {props.text}
    </span>
  )
}

export default HighLightText
