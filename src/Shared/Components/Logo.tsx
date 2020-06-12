import React from "react";
import logo from "./logo.svg";
import darkLogo from "./darkLogo.svg";
import { Link } from "react-router-dom";

interface Props {
  className: string;
  dark: boolean;
}
export const Logo = ({ className, dark }: Props) => {
  return (
    <Link to={"/all"}>
      <img
        className={className}
        // style={{ fill: "white" }}
        style={{ fill: "#FFFFFF" }}
        src={dark ? darkLogo : logo}
        alt={"Logo"}
      />
    </Link>
  );
};
