import React from "react";
import { Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="my-20 flex justify-center items-center">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#4373AF"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
