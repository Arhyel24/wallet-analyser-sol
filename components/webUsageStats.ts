// Data derived from https://gs.statcounter.com/os-market-share/desktop/worldwide/2023
// And https://gs.statcounter.com/os-market-share/mobile/worldwide/2023
// And https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2023
// For the month of December 2023

export const desktopOS = [
  {
    label: "Windows",
    value: 72.72,
  },
  {
    label: "OS X",
    value: 16.38,
  },
  {
    label: "Linux",
    value: 3.83,
  },
  {
    label: "Chrome OS",
    value: 2.42,
  },
  {
    label: "Other",
    value: 4.65,
  },
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;
