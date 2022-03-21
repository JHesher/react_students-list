import React from 'react';
import './StudentDetails.scss';

import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

type Props = {
  student: Student | null
};

export const StudentDetails: React.FC<Props> = ({ student }) => {
  return (
    <div className="StudentDetails">
      {
        student && (
          <div className="container">
            <div className="StudentDetails__student-info">
              <div className="StudentDetails__student">
                Student:
                <span className="StudentDetails__student--strong">{student.name}</span>
              </div>
              <div className="StudentDetails__student">
                Id:
                <span className="StudentDetails__student--strong">{student.id}</span>
              </div>
            </div>

            <div className="StudentDetails__filters">
              <div className="StudentDetails__selectors selector">
                <button
                  type="button"
                  className="selector__button"
                >
                  <div className="selector__title">
                    All concepts
                  </div>
                  <img
                    className="selectors__img"
                    src="img/arrow_drop_down--dark-gray.svg"
                    alt="arrow"
                  />
                </button>

                <button
                  type="button"
                  className="selector__button"
                >
                  <div className="selector__title">
                    All score
                  </div>
                  <img
                    className="selectors__img"
                    src="img/arrow_drop_down--dark-gray.svg"
                    alt="arrow"
                  />
                </button>

                <button
                  type="button"
                  className="selector__button "
                >
                  <div className="selector__title">
                    All speed
                  </div>
                  <img
                    className="selectors__img"
                    src="img/arrow_drop_down--dark-gray.svg"
                    alt="arrow"
                  />
                </button>
              </div>

              <div className="StudentDetails__period period">
                <div className="period__title">
                  Select period
                </div>
                <img
                  className="period__img"
                  src="img/calendar.svg"
                  alt="calendar"
                />

              </div>

              <div className="StudentDetails__cached">
                <img
                  src="img/cached.svg"
                  alt="cached"
                />
              </div>
            </div>

            <div className="StudentDetails__first-selector">
            </div>

            <div className="StudentDetails__progress">
              <div className="StudentDeails__labels labels">
                <div className="labels__title">Score</div>
                <div className="labels__label labels__label--blue">
                  <div className="labels__point labels__point--blue"></div>
                  90%+Accuracy
                </div>

                <div className="labels__label labels__label--green">
                  <div className="labels__point labels__point--green"></div>
                  80 - 89% Accuracy
                </div>

                <div className="labels__label labels__label--yellow">
                  <div className="labels__point labels__point--yellow"></div>
                  50 - 79% Accuracy
                </div>

                <div className="labels__label labels__label--red">
                  <div className="labels__point labels__point--red"></div>
                  Below 50% Accuracy
                </div>
              </div>

              <div className="StudentDeails__labels labels">
                <div className="labels__title">Speed</div>
                <div className="labels__label labels__label--blue">
                  <div className="labels__point labels__point--blue"></div>
                  Above Expected
                </div>

                <div className="labels__label labels__label--green">
                  <div className="labels__point labels__point--green"></div>
                  As Expected
                </div>

                <div className="labels__label labels__label--red">
                  <div className="labels__point labels__point--red"></div>
                  Below Expected
                </div>
              </div>
            </div>

            <div className="StudentDetails__table">
              <div className="StudentDetails__table-head">
                <div className="StudentDetails__table-count">#</div>
                <div className="StudentDetails__table-test">Test Label</div>
                <div className="StudentDetails__table-score">Score</div>
                <div className="StudentDetails__table-speed">Spped</div>
                <div className="StudentDetails__table-total">Total Q-ns</div>
                <div className="StudentDetails__table-exp">Exp.Spped</div>
                <div className="StudentDetails__table-concept">Concept</div>
                <div className="StudentDetails__table-date">
                  <div className="StudenDetails__date-title">Date</div>
                  <img
                    className="StudenDetails__date-img"
                    src="img/unfold_more.svg"
                    alt="arrow_drop_up"
                  />
                </div>
                <div className="StudentDetails__table-absent">Absent</div>
              </div>
              <div className="StudentDetails__table-body">
                <ul>
                  {student.tests.map((test, index) => (
                    <li
                      className={classNames({
                        'StudentDetails__table-item': true,
                        'StudentDetails__table-item--inactive': test.absent,
                      })}
                      key={uuidv4()}
                    >
                      <div className="StudentDetails__table-count">{`${index + 1}.`}</div>
                      <div className="StudentDetails__table-test">
                        {`Finding ${test.label}`}
                      </div>
                      <div className="StudentDetails__table-score">
                        {test.score || 'NIL'}
                      </div>
                      <div className="StudentDetails__table-speed">
                        {test.speed || 'NIL'}
                      </div>
                      <div className="StudentDetails__table-total">{test.total}</div>
                      <div className="StudentDetails__table-exp">{test.expSpeed}</div>
                      <div className="StudentDetails__table-concept">{test.concept}</div>
                      <div className="StudentDetails__table-date">
                        <div className="StudenDetails__date-title">{test.date}</div>
                      </div>
                      <div className="StudentDetails__table-absent">
                        <input
                          type="checkbox"
                          checked={test.absent}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="StudentDetails__second-selector"></div>

            <div className="StudentDetails__average">
              <div className="StudentDetails__average-title">
                Average
              </div>

              <div
                className="StudentDetails__average-percent"
                style={{
                  color: (() => {
                    switch (true) {
                      case (+student.score.slice(0, 2) < 50):
                        return '#db4437';
                      case (+student.score.slice(0, 2) < 80):
                        return '#E2B534';
                      case (+student.score.slice(0, 2) < 90):
                        return '#0F9D58';
                      default: return '#4285F4';
                    }
                  })(),
                }}
              >
                {student.score}
              </div>

              <div
                className="StudentDetails__average-expected"
                style={{
                  color: (() => {
                    switch (student.speed) {
                      case 'Below Expected': return '#db4437';
                      case 'Above Expected': return '#4285f4';
                      default: return '0f9d58';
                    }
                  })(),
                }}
              >
                {student.speed}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};
