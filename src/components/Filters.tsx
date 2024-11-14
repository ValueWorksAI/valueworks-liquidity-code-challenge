import React from "react";

interface FiltersProps {
  showFullTime: boolean;
  showPartTime: boolean;
  onFullTimeChange: () => void;
  onPartTimeChange: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  showFullTime,
  showPartTime,
  onFullTimeChange,
  onPartTimeChange,
}) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showFullTime}
          onChange={onFullTimeChange}
        />
        Display Full-time
      </label>
      <label>
        <input
          type="checkbox"
          checked={showPartTime}
          onChange={onPartTimeChange}
        />
        Display Part-time
      </label>
    </div>
  );
};

export default Filters;
