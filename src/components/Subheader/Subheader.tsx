import React from 'react';
import './Subheader.scss';

export const Subheader: React.FC = () => {
  return (
    <div className="Subheader">
      <ul className="Subheader__nav">
        <li className="Subheader__nav-item">
          <span className="Subheader__item">
            Show all
          </span>
          <img
            className="Subheader__icon"
            src="img/arrow_drop_down--ligth-gray.svg"
            alt="arrow_drop_down"
          />
        </li>
        <li className="Subheader__nav-item">
          <span className="Subheader__item">
            All grades
          </span>
          <img
            className="Subheader__icon"
            src="img/arrow_drop_down--ligth-gray.svg"
            alt="arrow_drop_down"
          />
        </li>
        <li className="Subheader__nav-item">
          <span className="Subheader__item">
            All classes
          </span>
          <img
            className="Subheader__icon"
            src="img/arrow_drop_down--ligth-gray.svg"
            alt="arrow_drop_down"
          />
        </li>
        <li className="Subheader__nav-item">
          <span className="Subheader__item">
            Av.score
          </span>
          <img
            className="Subheader__icon"
            src="img/arrow_drop_down--ligth-gray.svg"
            alt="arrow_drop_down"
          />
        </li>
        <li className="Subheader__nav-item">
          <span className="HSubheader__item">
            Av.speed
          </span>
          <img
            className="Subheader__icon"
            src="img/arrow_drop_down--ligth-gray.svg"
            alt="arrow_drop_down"
          />
        </li>
        <li className="Subheader__nav-item">
          <span className="Subheader__item">
            All classes
          </span>
          <img
            className="Subheader__icon"
            src="img/arrow_drop_down--ligth-gray.svg"
            alt="arrow_drop_down"
          />
        </li>
        <li className="Subheader__nav-item">
          <img
            className="Subheader__icon"
            src="img/clear--ligth-gray.svg"
            alt="arrow_drop_down"
          />
          <span className="Subheader__item-clear">
            Clear all
          </span>
        </li>
      </ul>
    </div>
  );
};
