import React from "react";

type T_Tooltip = {
  text: string;
};

const Tooltip: React.FC<T_Tooltip> = ({ text }) => {
  return (
    <div className="absolute -top-10 left-0 w-fit bg-White p-2 rounded-md border-2 border-DarkGray/50 z-50 whitespace-nowrap shadow-md">
      {text}
    </div>
  );
};

export default Tooltip;
