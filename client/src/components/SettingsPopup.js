import React from 'react';

function SettingsPopup({ isOpen, onClose, onSave }) {
  const [graphType, setGraphType] = React.useState("Deterministic");

  const handleSubmit = () => {
    onSave({ graphType });
    onClose();
  };

  return (
    isOpen && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div style={{ background: '#015EA5', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>
          <h2>Settings</h2>
          <label>
            Graph Type:
            <select value={graphType} onChange={e => setGraphType(e.target.value)}>
              <option value="Deterministic">Deterministic</option>
              <option value="Random">Random</option>
              {/* <option value="Exponential">Exponential</option> */}
            </select>
          </label>
          <div>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}

export default SettingsPopup;