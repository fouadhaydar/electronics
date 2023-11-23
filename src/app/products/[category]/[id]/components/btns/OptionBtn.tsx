import React, { memo } from "react";

interface OptionBtnInterface {
  option: string;
  storageRam: string;
  handleSelectStorageRam: (option: string) => void;
}

const OptionBtn = ({
  option,
  storageRam,
  handleSelectStorageRam,
}: OptionBtnInterface) => {
  return (
    <div>
      <button
        className={`${
          storageRam == option
            ? "bg-blue-400 text-white"
            : "bg-white text-black"
        } border  border-black  rounded-[4px] p-2 text-[12px] btn_hover`}
        onClick={() => handleSelectStorageRam(option)}
      >
        {option}
      </button>
    </div>
  );
};

export default memo(OptionBtn);
