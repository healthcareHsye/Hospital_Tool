import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../modalstyle.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Output() {
  const tabNames = ["Patient and Room Types", "Lengths of Stay", "Starting Census", "Admissions History", "PPE Consumption Rate", "Current Inventory"];
  const [data, setData] = useState(null);
  const [inputMatrices, setInputMatrices] = useState({});
  const [censusOutput, setCensusOutput] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [graphType, setGraphType] = useState('Deterministic'); // State to hold dropdown value
  const [activeTab, setActiveTab] = useState(tabNames[0]);



  useEffect(() => {
    fetchGraphData();
    fetchMatrixData();
    if (data && data.censusoutput) {  // Check if 'data' is not null before accessing 'censusoutput'
      setCensusOutput(data.censusoutput);
    }
  }, []);

  const fetchGraphData = () => {
    axios
      .get(`http://127.0.0.1:5002/compute_chart?type=${graphType}`)
      .then((response) => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const fetchMatrixData = () => {
    axios.get(`http://127.0.0.1:5002/compute_chart?type=${graphType}`)
        .then(response => {
          console.log(response.data); // Add this line to log the data structure
          if (response.data) {
            setInputMatrices(response.data.inputmatrix);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the matrices!', error);
        });
  };

  const handleGraphTypeChange = (e) => {
    setGraphType(e.target.value);
  };

  const handleGenerateGraph = () => {
    fetchGraphData();
  };

  const handleMatrixInputChange = (matrixName, rowIndex, columnIndex, newValue) => {
    setInputMatrices(prevMatrices => {
      const newMatrices = {...prevMatrices};

      const updatedMatrix = [...newMatrices[matrixName]];
      const updatedRow = [...updatedMatrix[rowIndex]];

      // Update the cell with the new value
      updatedRow[columnIndex] = Number(newValue); // Make sure it's a number if that's what you expect

      // Put the updated row back into the matrix
      updatedMatrix[rowIndex] = updatedRow;

      // Put the updated matrix back into the object of matrices
      newMatrices[matrixName] = updatedMatrix;
      console.log('Updated Matrix:', newMatrices[matrixName]);
      return newMatrices;
    });
  };

  const handleMatrixSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    axios.post('http://127.0.0.1:5002/compute_chart?type=${graphType}', inputMatrices)
        .then(response => {

          setData(response.data);
          setIsModalOpen(false);
          //fetchGraphData(); // Assuming you want to refetch the graph data after updating inputs

        })
        .catch(error => {
          console.error('There was an error running the model with new data!', error);
        });
  };


  // Button style
  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    minWidth: '100px', // Ensure all buttons have at least the same width
    textDecoration: 'none', // To remove the underline from links
    color: 'white', // You can choose the color that fits your design
    background: '#3498db', // Same here for the background color
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer'
  };

  // New handler for Bed button click
  const handleBedClick = () => {
    // if (data && data.bed) {
    axios
        .get(`http://127.0.0.1:5002/compute_chart?type=${graphType}`)
        .then((response) => {
          if (response.data && response.data.bed) {
            // Assuming response.data is the graph file path or array of paths
            setData({ ...data, graph_files: response.data.bed });
          }
        })
        .catch((error) => {
          console.error('There was an error fetching the bed graph data!', error);
        });
    // }
  };

  // New handler for Equipment button click
  const handleEquipmentClick = () => {
    // if (data && data.bed) {
    axios
        .get(`http://127.0.0.1:5002/compute_chart?type=${graphType}`)
        .then((response) => {
          if (response.data && response.data.equipment) {
            // Assuming response.data is the graph file path or array of paths
            setData({ ...data, graph_files: response.data.equipment });
          }
        })
        .catch((error) => {
          console.error('There was an error fetching the bed graph data!', error);
        });
    // }
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log("Open Modal",isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Close Modal", isModalOpen)
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchDBData = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div style={{ display: 'flex' }}>
      {/* Left Component */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '5px',
        background: 'linear-gradient(to bottom, #2980b9, #6dd5fa)',
        overflowY: 'auto',
      }}>
        {/* Dropdown and Download button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '10px' }}>
          <select id="graphType" value={graphType} onChange={handleGraphTypeChange} style={{ ...buttonStyle, flexGrow: 1 }}>
            <option value="Deterministic">Deterministic</option>
            <option value="Random">Random</option>
            {/* Additional options can be added here */}
          </select>
          {data && (
            <a
              href={`http://127.0.0.1:5002/${data.output_file}`}
              style={buttonStyle}
              download // This attribute will prompt the file download
            >
              Download
            </a>
          )}
        </div>
        
        {/* Bed and Staff buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
          <button onClick={handleBedClick} style={buttonStyle}>Bed</button>
          <button onClick={handleEquipmentClick} style={buttonStyle}>Staff</button>
        </div>

        {/* Equipment and Show Data buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <button onClick={handleEquipmentClick} style={buttonStyle}>Equipment</button>
          <button style={buttonStyle}>Show Data</button>
        </div>

        {/* Generate Graph button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleGenerateGraph} style={{ ...buttonStyle, width: 'calc(100% - 10px)' }}>Generate Graph</button>
        </div>

        {/* Display Input Data */}
        <div className="census-output-section">
          <h2>Census Output</h2>
          <table>
            <thead>
            <tr>
              {/* Assuming you have headers, map them here */}
              {censusOutput.length > 0 && censusOutput[0].map((header, index) => (
                  <th key={index}>{header}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {censusOutput.slice(1).map((row, rowIndex) => ( // Use slice to skip header row if it's included
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
            ))}
            </tbody>
          </table>
        </div>



      </div>



      {/* Right Component (Unchanged) */}

      <div style={{ flex: '1', padding: '20px', overflowY: 'auto', }}>
        <h1>Output Graphs</h1>
        <button id="openModal" onClick={openModal} style={buttonStyle}>Update Inputs</button>
        {data ? (
          <div id="graphsContainer">
            {data.graph_files.map((graphPath, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:5002/${graphPath}`}
                alt="Graph Image"
                width="400"
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}


        {isModalOpen && (
            <div className="modal" style={{ display: isModalOpen ? 'flex' : 'none' }}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>

                <div className="tabs">
                  {tabNames.map((name, index) => (
                      <button key={name} onClick={() => handleTabClick(name)} style={activeTab === name ? { backgroundColor: '#ccc' } : {}}>
                        {name}
                      </button>
                  ))}
                </div>

                <form onSubmit={handleMatrixSubmit}>
                  {Object.entries(inputMatrices).map(([matrixName, matrix], index) => (
                      <div key={matrixName} style={{ display: activeTab === tabNames[index] ? 'block' : 'none' }}>
                        {/*<h3>{capitalizeFirstLetter(matrixName.replace("_", " "))}</h3>*/}
                        <table>
                          <tbody>
                          {matrix.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, columnIndex) => (
                                    <td key={columnIndex}>
                                      <input
                                          type="number"
                                          name={`${matrixName}_${rowIndex}_${columnIndex}`}
                                          value={cell}
                                          required
                                          onChange={(e) => handleMatrixInputChange(matrixName, rowIndex, columnIndex, e.target.value)}
                                      />
                                    </td>
                                ))}
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                  ))}
                  <button onClick={handleMatrixSubmit} style={buttonStyle}>Regenerate Graphs</button>
                  <button onClick={fetchDBData} style={buttonStyle}>Fetch DB data</button>
                </form>
              </div>
            </div>
        )}

      </div>
    </div>
  );
}

export default Output;
