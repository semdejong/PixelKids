import React from "react";

export default function Icon({ icon, ...props }) {
  return <i class={`fa-solid ${icon}`} {...props}></i>;
}
