import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
import logo from "./images/logo.jpg";
import ImportData from "./pages/ImportData";
import FileUploader from "./components/FileUploader";
import Output from "./pages/Output";
import CChart from "./pages/CChart";
import Box from "@mui/material/Box";
import ProgramOverview from './pages/ProgramOverview';
import InstructionPage from './pages/InstructionPage';
=======
import logo from "./images/logo.png";
import ImportData from "./pages/ImportData";
import FileUploader from "./components/FileUploader";
import Output from "./pages/Output"; // or './components/Output' depending on your file structure
import CChart from "./pages/CChart";
>>>>>>> d276f0ce (Include client-side folder in main repository)

function App() {
  return (
    <>
      <BrowserRouter>
<<<<<<< HEAD
        <Box className="header-container">
          <img className="logo" src={logo} alt="Logo" />
          <Typography variant="h6" className="header-title">
            <b>HSYE INSTITUTE EPIDEMIC SURVEILLANCE TOOL</b>
          </Typography>
        </Box>
        <Navbar />
        <Routes>
          <Route path="importData" element={<ImportData />} />
          <Route path="c-Chart" element={<CChart />} />
          <Route path="output" element={<Output />} />
          <Route path="programOverview" element={<ProgramOverview />} />
          <Route path="instructions" element={<InstructionPage />} />
=======
        <Typography variant="h4">
          <img src={logo} alt="Logo" />
          HSYE INSTITUTE EPIDEMIC SURVEILLANCE TOOL{" "}
        </Typography>
        <Navbar />
        <Routes>
          
          <Route path="importData" element={<ImportData />} />
          <Route path="c-Chart" element={<CChart />} />
          <Route path="output" element={<Output />} />
>>>>>>> d276f0ce (Include client-side folder in main repository)
        </Routes>
      </BrowserRouter>
      <FileUploader />
    </>
  );
}

export default App;
<<<<<<< HEAD
=======

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Routes, Route, Router } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import logo from "./images/logo.png";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Footer from "./Footer";

// function App() {
//   // To fetch data from backend- python server
//   const [data, setData] = useState([{}]);
//   useEffect(() => {
//     fetch("/members")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         console.log(data);
//       });
//   }, []);
//   return (
//     <div>
//       {/* <Box sx={{ width: '75%', maxWidth: 500 }}> */}
//       <Typography variant="h4">
//         <img src={logo} alt="Logo" />
//         HSYE INSTITUTE EPIDEMIC SURVEILLANCE TOOL
//       </Typography>
//       {/* </Box> */}
//       <Navbar />
//       <Footer />
//       {typeof data.members === "undefined" ? (
//         <p> Loading...</p>
//       ) : (
//         data.members.map((member, i) => <p key={i}>{member}</p>)
//       )}
//     </div>
//   );
// }

// export default App;
>>>>>>> d276f0ce (Include client-side folder in main repository)
