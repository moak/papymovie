import React, { useState } from 'react';

import Moon from 'public/icons/Moon';
import Sun from 'public/icons/Sun';

const ThemeToggle = (props) => {
  const { isDarkMode, toggleTheme } = props;

  const [toggled, setIsToggled] = useState(isDarkMode || false);

  const toggleState = () => {
    toggleTheme();
    setIsToggled((prevState) => !prevState);
  };

  return (
    <label htmlFor="toggle">
      <div className={`toggle ${toggled ? 'enabled' : 'disabled'}`}>
        <span className="hidden">{toggled ? 'Enable Light Mode' : 'Enable Dark Mode'}</span>
        <div className="icons">
          <Moon width={14} height={14} />
          <Sun width={14} height={14} />
        </div>
        <input id="toggle" name="toggle" type="checkbox" checked={toggled} onClick={toggleState} />
      </div>
    </label>
  );
};

export default ThemeToggle;
