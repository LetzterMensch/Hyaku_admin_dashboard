/* eslint-disable no-unused-vars */
import { Chart as ChartJS, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { Spinner } from "../components";
import { client } from "../services/axios";
ChartJS.register(...registerables);
function DashboardView() {
  return(
    <div className="flex h-full justify-center items-center">
      <Spinner />
    </div>
  )
}
export default DashboardView;