"use client";
import { AlertTitle, Alert } from "@mui/material";
import Link from "next/link";

const AlertComponent = ({
  errorMessage,
  text,
  logIn,
}: {
  errorMessage: string;
  text: string;
  logIn: boolean;
}) => {
  return (
    <Alert
      severity="error"
      className="w-full p-4 rounded-md items-start min-h-full"
    >
      <AlertTitle className="font-bold">Error</AlertTitle>
      {errorMessage} <strong>{text}</strong>
      <Link
        href={`/${logIn ? "sign-up" : "log-in"}`}
        className="mx-2 min-h-[30px] text-blue-500 cursor-pointer font-bold border-b-2 border-blue-500"
      >
        {logIn ? "sign-up" : "log-in"}
      </Link>
    </Alert>
  );
};
export default AlertComponent;
