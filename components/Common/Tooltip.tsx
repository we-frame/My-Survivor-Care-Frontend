import { TooltipTypes } from "@/types/tooltip";
import { useState } from "react";

const Tooltip: React.FC<TooltipTypes> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div className="cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
        {children}
      </div>
      {isVisible && (
        <div className="absolute -top-32 left-0 w-80 p-4 bg-white rounded-lg shadow-lg z-50">
          <button
            className="absolute -top-5 -right-3 px-2 py-[1px] rounded-full bg-black text-white"
            onClick={() => setIsVisible(false)}
          >
            &times;
          </button>
          <div className="text-gray-700 w-full">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
