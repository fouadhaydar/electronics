import { Rating } from "@mui/material";
import React, { useState } from "react";
import { StarFill } from "react-bootstrap-icons";
import RatingBar from "./RatingBar";
import uuid from "react-uuid";

const RatingSysteme = ({
  x,
  s,
  totalNum,
  show,
}: {
  x: number;
  s: number[];
  totalNum: number;
  show: boolean;
}) => {
  const [value, setValue] = useState<number | null>(0);
  return (
    <div
      className={`mt-16 flex flex-col gap-6 w-[100%] transition ease-in-out duration-150 justify-center`}
      style={{ transform: `translateX(${x}px)` }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        // getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        // onChangeActive={(event, newHover) => {
        //   setHover(newHover);
        // }}
        emptyIcon={<StarFill style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {/* {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )} */}
      <div className="flex flex-col gap-4 h-full w-full">
        {s.map((num) => {
          return (
            <RatingBar
              key={uuid()}
              percentage={() => {
                return (num / totalNum) * 100;
              }}
              show={show}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RatingSysteme;
