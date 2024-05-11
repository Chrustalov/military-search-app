import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function EyeIcon(props) {
  if (props.isOpen) 
    return <FaEye {...props} />;

    return <FaEyeSlash {...props} />;
}

export default EyeIcon