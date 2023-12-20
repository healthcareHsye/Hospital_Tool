import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Typography from "@mui/material/Typography";
import logo from "./images/logo.png";
import ImportData from "./pages/ImportData";
import FileUploader from "./components/FileUploader";
import Output from "./pages/Output"; // or './components/Output' depending on your file structure
import CChart from "./pages/CChart";

function App() {
    return (
        <>
            <BrowserRouter>
                <Typography variant="h4">
                    <img src={logo} alt="Logo" />
                    HSYE INSTITUTE EPIDEMIC SURVEILLANCE TOOL{" "}
                </Typography>
                <Navbar />
                <Routes>

                    <Route path="importData" element={<ImportData />} />
                    <Route path="c-Chart" element={<CChart />} />
                    <Route path="output" element={<Output />} />
                </Routes>
            </BrowserRouter>
            <FileUploader />
        </>
    );
}

export default App;

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
