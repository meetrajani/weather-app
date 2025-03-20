import React from 'react'

const UnitToggle = ({ isCelsius, toggleUnit, disabled }) => {
    return (
      <div className="text-center mb-4">
        <button
          onClick={toggleUnit}
          disabled={disabled}
          className={`bg-gray-200 px-4 py-2 rounded-lg transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Switch to {isCelsius ? '°F' : '°C'}
        </button>
      </div>
    );
  };

export default UnitToggle
