import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Output() {
  const [data, setData] = useState(null);
  const [graphType, setGraphType] = useState('Deterministic'); // State to hold dropdown value

  useEffect(() => {
    fetchGraphData();
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

  const handleGraphTypeChange = (e) => {
    setGraphType(e.target.value);
  };

  const handleGenerateGraph = () => {
    fetchGraphData();
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
          <button style={buttonStyle}>Bed</button>
          <button style={buttonStyle}>Staff</button>
        </div>

        {/* Equipment and Show Data buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
          <button style={buttonStyle}>Equipment</button>
          <button style={buttonStyle}>Show Data</button>
        </div>

        {/* Generate Graph button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleGenerateGraph} style={{ ...buttonStyle, width: 'calc(100% - 10px)' }}>Generate Graph</button>
        </div>
      </div>

      {/* Right Component (Unchanged) */}
      <div style={{ flex: '2', padding: '20px' }}>
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
