import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, valueFormatter } from "./webUsageStats";

export default function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 50, additionalRadius: -30, color: "purple" },
          valueFormatter,
        },
      ]}
      height={200}
    />
  );
}
