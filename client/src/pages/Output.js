import React, { useEffect, useState } from 'react';
import axios from 'axios';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Output() {
  const [data, setData] = useState(null);
  const [inputMatrices, setInputMatrices] = useState({});
  const [graphType, setGraphType] = useState('Deterministic'); // State to hold dropdown value

  useEffect(() => {
    fetchGraphData();
    fetchMatrixData();
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
      return newMatrices;
    });
  };

  const handleMatrixSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    axios.post('http://127.0.0.1:5002/compute_chart?type=${graphType}', inputMatrices)
        .then(response => {
          // The model ran successfully with the new data
          // You might want to fetch the new graph data here or handle the response
          fetchGraphData(); // Assuming you want to refetch the graph data after updating inputs
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
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <h1>Input Tables</h1>
          <form onSubmit={handleMatrixSubmit}>
            {Object.entries(inputMatrices).map(([matrixName, matrix]) => (
                <div key={matrixName}>
                  <h3>{capitalizeFirstLetter(matrixName.replace("_", " "))}</h3>
                  <table>
                    <tbody> {/* Add tbody here */}
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
            <button onClick={handleMatrixSubmit} style={buttonStyle}>Update Inputs</button>
          </form>
        </div>

      </div>



      {/* Right Component (Unchanged) */}
      <div style={{ flex: '1', padding: '20px', overflowY: 'auto', }}>
        <h1>Output Results</h1>
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
      </div>
    </div>
  );
}

export default Output;
