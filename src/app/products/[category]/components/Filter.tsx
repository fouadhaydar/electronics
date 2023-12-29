"use client";
import {
  IconButton,
  InputAdornment,
  TextField,
  SelectChangeEvent,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setManufacturer,
  setManufacturerName,
} from "../../../../redux/features/manufacturer-silce";
import useCustomeFetch from "@/hooks/useCustomeFetch";

type Manufacturer = {
  id: 1;
  manufacturerName: "Tecno";
  products: null;
};

const Filter = () => {
  const [value, setValue] = useState("");
  const [target, setTarget] = useState<number>(0);
  const dispatch = useDispatch();

  const {
    data: options,
    isLoading,
    error,
  } = useCustomeFetch<Manufacturer[]>("/manufacturer/getallmanufacturer");

  const handleChange = (event: SelectChangeEvent) => {
    setTarget(+event.target.value);
    dispatch(setManufacturer(+event.target.value));
  };

  const handleChangeSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    dispatch(setManufacturerName(e.target.value));
  };

  const pathName = usePathname();
  let counter = 0;

  for (let i = 0; i < pathName.length; i++) {
    if (pathName[i] === "/") counter++;
  }
  if (counter > 2) {
    return <></>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold my-4">Filter By: </h2>
      <div className="w-full flex justify-between md:gap-40 xsm:gap-4 xsm:flex-col md:flex-row">
        <TextField
          label={"Search"}
          value={value}
          placeholder="Search"
          onChange={(event) => handleChangeSearch(event)}
          className="md:w-2/6 xsm:w-full"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <hr className="w-[1px] h-[30px] bg-slate-400" />
                <IconButton>
                  <Search size={20} className="mx-1" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {options && (
          <div className="md:w-2/6 xsm:w-full flex justify-center items-center gap-4">
            <FormControl fullWidth>
              <InputLabel id="By Company">Company</InputLabel>
              <Select
                labelId="By Company"
                value={target.toString()}
                onChange={handleChange}
                label={"Company"}
                className={`${target == 0 ? "text-gray-400" : "text-black"} `}
              >
                <MenuItem value="0" className="text-gray-400">
                  All Company
                </MenuItem>
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.manufacturerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
