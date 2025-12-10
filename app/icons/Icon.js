import React from "react";
import GmailIcon from "./GmailIcon";
import XIcon from "./XIcon";

const icons = {
  gmail: GmailIcon,
  x: XIcon,
};

const Icon = ({ name, width = 20, height = 20, className = "" }) => {
  const Component = icons[name];
  if (!Component) return null;
  return <Component width={width} height={height} className={className} />;
};

export  {Icon};
