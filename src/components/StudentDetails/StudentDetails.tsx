import React from 'react';
import './StudentDetails.scss';

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
              <div className="StudentDetails__name">
                Student:
                <span>{student.name}</span>
              </div>
              <div className="StudentDetails__id">
                <div className="StudentDetails__name">
                  Id:
                  <span>{student.id}</span>
                </div>
              </div>
            </div>
            <div className="StudentDetails__selectors"></div>
            <div className="StudentDetails__progress"></div>
            <div className="StudentDetails__table">
              <div className="StudentDetails__table-header"></div>
              <div className="StudentDetails__table-body"></div>
            </div>
            <div className="StudentDetails__underline"></div>
          </div>
        )
      }
    </div>
  );
};
