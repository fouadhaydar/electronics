import React from "react";
import { BeatLoader } from "react-spinners";

const Submit = ({ disabled, text }: { disabled: boolean; text: string }) => {
  return (
    <button type="submit" className="submit_btn flex-1" disabled={disabled}>
      {disabled ? (
        <BeatLoader color="#36d7b7" size={7} loading={disabled} />
      ) : (
        text
      )}
    </button>
  );
};

export default Submit;
