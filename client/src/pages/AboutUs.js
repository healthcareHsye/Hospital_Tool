import React from 'react';
import './AboutUs.css'; // Create this CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="overview">
        {/* Your overview paragraphs */}
        <h1>Overview</h1>
        <h4>
          CapSurg is a Free model for predicting daily bed demand, staffing, equipment consumption under routine or uncertain epidemic surge conditions.
          The model predicts 1-to-30 days ahead on a rolling basis bed demand by unit, staffing, and equipment consumption - much like a rolling weather forecast - so that hospital decision-makers
          can pre-emptively make operational decisions, resiliently manage uncertainty, and maximize safe operating care conditions. The model also can 
          self-calibrate itself to maximize accuracy under potentially constantly changing conditions.
        </h4>
        <h1>Acknowledgements</h1>
        <h4>
          CapSurg was developed by the Healthcare Systems Engineering Institute (HSye) and supported in part by the Agency for Healthcare Research and Quality (HRQ)
        </h4>
      </div>
      <div className="example-graphs">
        {/* Your example output graphs */}
        <h1>Example Output Graphs</h1>
        <div className="graph-row">
          <div className="graph">
            {/* Add Graph 1 */}
          </div>
          <div className="graph">
            {/* Add Graph 2 */}
          </div>
        </div>
        <div className="graph-row">
          <div className="graph">
            {/* Add Graph 3 */}
          </div>
          <div className="graph">
            {/* Add Graph 4 */}
          </div>
        </div>
        <div className="action-buttons">
          <button className="run-model-button">Run Model</button>
          <button className="input-template-button">Input Template</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
