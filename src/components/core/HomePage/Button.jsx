import React from 'react'
import {Link} from "react-router-dom";

// it takes three things -> children (button name)
//                        -> color - button's color (can be yellow and blue)    => can be added more
//                        -> linkto = where this button takes us
const Button = ({children, color, linkto}) => {
  const colorMap={
    "yellow":"bg-yellow-400",
    "blue":"bg-blue-500",
    "red":"bg-red-600",
    "green":"bg-green-600",
    "black":"bg-gray-600"
  }
  let textColor = "text-black";
  if(color == "black"){
    textColor = 'text-white';
  }


  return (
    <Link to={linkto}>
        <div className={`text-center text-[15px] px-6 py-2.5 font-bold rounded-md ${colorMap[color]} ${textColor} transition-all duration-150 hover:scale-95 hover:shadow hover:shadow-purple-200`}>
            {children}
        </div>
    </Link>
  )
}

export default Button
