import React from "react";
import logo from "../Images/logo.svg";
import darkLogo from "../Images/darkLogo.svg";
import { Link } from "react-router-dom";

interface Props {
  className: string;
  dark: boolean;
}
export const Logo = ({ className, dark }: Props) => {
  const src = dark ? darkLogo : logo;
  return (
    <Link to={"/all"}>
      <img className={className} src={src} alt={"Logo"} />
    </Link>
  );
};
