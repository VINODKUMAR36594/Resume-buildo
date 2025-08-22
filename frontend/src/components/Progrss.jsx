import React from "react";

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
  return (
    <div>
      <div className="flex gap-1.5">
        {[...Array(total)].map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded transition-all"
            style={{
              backgroundColor:
                index < progress
                  ? color || "rgba(1,1,1,1)"
                  : bgColor || "rgba(1,1,1,0.1)",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
