export const navItems = [
  {
    id: 1,
    title: "About Us",
    path: "./aboutUs",
    cName: "nav-item",
  },

  {
    id: 2,
    title: "Covid 19 - Tools",
    path: "./newOutbreakBaseline",
    cName: "nav-item",
  },

  {
    id: 3,
    title: "Instructions",
    path: "./trajectories",
    cName: "nav-item",
  },

  {
    id: 4,
    title: "Template",
    path: "./endOfOutbreak",
    cName: "nav-item",
  },

  {
    id: 5,
    title: "Settings",
    path: "./settings",
    cName: "nav-item",
  },
];

export const aboutUsDropdown = [
  {
    id: 1,
    title: "Program OverView",
    path: "./programOverview",
    cName: "nav-item",
  },

  {
    id: 2,
    title: "Instructions",
    path: "./instructions",
    cName: "nav-item",
  },

  {
    id: 3,
    title: "Feedback",
    path: "./feedback",
    cName: "nav-item",
  },
];

export const newOutbreaksAndBaselineDropdown = [
  {
    id: 1,
    title: "Charts",
    path: "./c-Chart",
    cName: "nav-item",
  },

  {
    id: 2,
    title: "Moving Averages",
    path: "./movingAverages",
    cName: "nav-item",
  },

  // {
  //   id: 3,
  //   title: " P-chart",
  //   path: "./pChart",
  //   cName: "nav-item",
  // },

  // {
  //   id: 4,
  //   title: "Moving Averages",
  //   path: "./movingAverages",
  //   cName: "nav-item",
  // },
];

export const trajectoriesDropdown = [
  {
    id: 1,
    title: "Rolling Window",
    path: "./rollingWindow",
    cName: "nav-item",
  },
];

export const endOfOutbreaksDropdown = [
  {
    id: 1,
    title: "SPRT Charts",
    path: "./sprtCharts",
    cName: "nav-item",
  },
];

export const settingsDropdown = [
  {
    id: 1,
    title: "Import Data",
    path: "./importData",
    cName: "nav-item",
  },
];

export const dropdownItems = {
  "About Us": aboutUsDropdown,
  "Covid 19 - Tools": newOutbreaksAndBaselineDropdown,
  "Instructions": trajectoriesDropdown,
  "Template": endOfOutbreaksDropdown,
  Settings: settingsDropdown,
};