import React from "react";
import "./Spinner.module.css";

function Spinner() {
  return (
    <div className="h-8 w-8 border-4 border-t-green-400 rounded-full animate-spin" />
  );
}

export default Spinner;