import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="Header__logo-block">
        {/* <div className="Header__logo-container">
          <img
            className="Header__logo"
            src="img/Logo.png"
            alt="logo_school"
          />
        </div> */}
        <div className="Header__school-block">
          <span className="Header__school">
            School1
          </span>
          <img
            className="icon"
            src="img/arrow_drop_down--mid-gray.svg"
            alt="arrow_drop_down"
          />
        </div>
      </div>
      <div>
        <ul className="Header__nav">
          <li className="Header__nav-item">Analitics</li>
          <li className="Header__nav-item">Cradebooks</li>
          <li className="Header__nav-item">Tests</li>
          <li className="Header__nav-item Header__nav-item--active">Students</li>
          <li className="Header__nav-item">Teachers</li>
          <li className="Header__nav-item">Archive</li>
        </ul>
      </div>
      <div className="Header__user">
        <div className="Header__img-container">
          <img
            className="Header__img"
            src="img/User.png"
            alt="user"
          />
          <img
            className="icon"
            src="img/arrow_drop_down--mid-gray.svg"
            alt="arrow_drop_down"
          />
        </div>
      </div>
    </div>
  );
};
