"use client";

import { useEffect, useRef, useState } from "react";

const RatingBar = ({
  percentage,
  show,
}: {
  percentage: () => number;
  show: boolean;
}) => {
  const num = percentage();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(num);
  }, [show]);

  return (
    <div className="w-full flex gap-2 items-center">
      <div className="h-3 bg-gray-300 relative rounded-full w-[90%]">
        <div
          style={{
            width: `${width}%`,
            transition: "width 0.3s ease-in-out",
            backgroundColor: "orange",
            height: "12px",
            position: "absolute",
            borderRadius: "9999px",
          }}
        />
      </div>
      <span className="w-[10%]">{num.toFixed(1)} %</span>
    </div>
  );
};

export default RatingBar;
