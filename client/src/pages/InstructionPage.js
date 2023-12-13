import React from 'react';
import './InstructionPage.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function InstructionPage() {
    const data = [
        // Your table data here in an array-of-arrays or array-of-objects format
        { Row: '9-10', Instructions: 'Drop down to select planning period weeks...', Notes: 'May add more options in future version', Inputs: '1. COVID-19 Rates and Admission Trends', Screenshot: 'Planning period (select): 4 weeks' },
        // ... more data
      ];
    
      const downloadExcel = () => {
        // Create a new workbook and add a worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
    
        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Instructions');
    
        // Generate Excel file and trigger download
        XLSX.writeFile(wb, 'instructions.xlsx');
  };

  return (
    <div className="instruction-page">
      <table className="instruction-table">
        <thead>
          <tr>
            <th>Row</th>
            <th>Row-by-Row Input Instructions</th>
            <th>Notes and Assumptions</th>
            <th>Inputs</th>
            <th>Screenshot</th>
          </tr>
        </thead>
        <tbody>
          {/* Box 1: COVID-19 Rates and Admission Trends */}
          <tr>
            <td>9-10</td>
            <td>Drop down to select planning period weeks (uses row 11 and 12) or enter estimated day-by-day cases (users enter in column AP)</td>
            <td>May add more options in future version</td>
            <td>1. COVID-19 Rates and Admission Trends</td>
            <td>Planning period (select): 4 weeks</td>
          </tr>
          {/* ... other rows */}
          <tr>
            <td>11</td>
            <td>Doubling rate in number of days until number of suspected cases estimated to double</td>
            <td>Assumes piecewise exponential curve; can vary range of exponential</td>
            <td>Number case doubles every: 10 days</td>
            <td>Suspected case trend (select): Manual (right)</td>
          </tr>
          {/* ... more content */}
        </tbody>
      </table>
      <button onClick={downloadExcel} className="download-button">
        DOWNLOAD TABLE
      </button>
    </div>
  );
}

export default InstructionPage;
