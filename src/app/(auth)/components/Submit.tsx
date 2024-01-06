import Loader from "@/components/Loader";
import React from "react";

const Submit = ({ disabled, text }: { disabled: boolean; text: string }) => {
  return (
    <button type="submit" className="submit_btn flex-1" disabled={disabled}>
      {disabled ? <span>Submiting...</span> : text}
    </button>
  );
};

export default Submit;
