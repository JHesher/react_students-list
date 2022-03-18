import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSVLink } from 'react-csv';

import { getStudents, sortedByName } from '../../api/students';
import { StudentDetails } from '../StudentDetails';

import './StudentsList.scss';

export const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [selectedStudentUniqId, setSelectedStudentUniqId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [sortByName, setSortByName] = useState(0);
  // const [sortByName, setSortByName] = useState('');
  // const [sortByScore, setSortByScore] = useState(0);
  // const [sortBySpeed, setSortBySpeed] = useState(0);

  const getStudentsByQuery = (studentFromServer: Student[]) => {
    const queryLowerCase = query.toLowerCase();

    return studentFromServer.filter(student => (
      student.name.toLowerCase().includes(queryLowerCase)
      || student.id.toString().includes(query)
      || student.parents.find(parent => (
        parent.toLowerCase().includes(queryLowerCase)
      ))
    ));
  };

  const csvmaker = (data: Student[]) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push([...headers]);
    const values = data.map(student => Object.values(student));

    csvRows.push(...values);

    return csvRows.join('\n');
  };

  // let csvData: (string | number | string[] | Test[])[][] = [];
  let csvData = '';

  const loadStudents = async () => {
    const dataFromServer = await getStudents(page);
    const preparedData = dataFromServer.data
      .map(student => ({
        ...student,
        uniq: uuidv4(),
      }));

    setStudents(getStudentsByQuery(preparedData));

    csvData = csvmaker(preparedData);
    // eslint-disable-next-line no-console
    console.log(csvmaker(preparedData));
  };

  const setSortedById = async () => {
    const dataFromServer = await sortedByName(page, sortByName);

    setStudents(dataFromServer.data);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleClick = (id: string) => {
    setDetailsVisible(!isDetailsVisible);
    setSelectedStudentUniqId(id);
    const setStudent = students
      .find(student => student.uniq === selectedStudentUniqId) || null;

    setSelectedStudent(setStudent);
  };

  const handleClickName = () => (
    sortByName === 0 ? setSortByName(-1) : setSortByName(sortByName * -1)
  );

  // eslint-disable-next-line no-console
  console.log(sortByName);

  useEffect(() => {
    loadStudents();
  }, [page, query]);

  useEffect(() => {
    setSortedById();
  }, [sortByName]);

  return (
    <div className="StudentsList">
      <div className="StudentsList__header">
        <h1 className="StudentsList__title">Students</h1>

        <form className="StudentsList__form">
          <input
            className="StudentsList__input"
            type="text"
            placeholder="Enter Student Name, Parent or ID here"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </form>

        <div className="StudentsList__export-container">
          <CSVLink
            data={csvData}
            filename="students-list.csv"
            className="StudentsList__export-link"
            target="_blank"
          >
            <img
              className="StudentsList__icon"
              src="img/upload.svg"
              alt="arrow_drop_down"
            />
            <span className="StudentsList__export">
              Export CSV
            </span>
          </CSVLink>
        </div>
      </div>

      <div className="StudentsList__table table">
        <div className="table__header">
          <input type="checkbox" />

          <div className="table__name">
            <span>Name</span>
            <button
              className="button"
              type="button"
              onClick={() => handleClickName()}
            >
              <img
                className="table__img"
                src="img/sort_by_alpha.svg"
                alt="sort_by_alpha"
              />
            </button>
          </div>

          <div className="table__id">
            <span>ID</span>
            <button
              className="button"
              type="button"
            >
              <img
                src="img/unfold_more.svg"
                alt="sort_by_alpha"
              />
            </button>
          </div>

          <div className="table__class">Class</div>

          <div className="table__score">
            <span>Av.Score,%</span>
            <button
              className="button"
              type="button"
            >
              <img
                className="table__img"
                src="img/unfold_more.svg"
                alt="sort_by_alpha"
              />
            </button>
          </div>

          <div className="table__speed">
            <span>Av.Speed</span>
            <button
              className="button"
              type="button"
            >
              <img
                className="table__img"
                src="img/unfold_more.svg"
                alt="sort_by_alpha"
              />
            </button>
          </div>

          <div className="table__parents">Perents</div>
          <div className="table__actions">Actions</div>
        </div>

        <div className="table__body">
          <ul className="table__list">
            {students.map(student => (
              <>
                <li
                  className="table__item"
                  key={student.uniq}
                >
                  <input type="checkbox" />
                  <div className="table__name">
                    <span>{student.name}</span>
                  </div>
                  <div className="table__id">
                    <span>{student.id}</span>
                  </div>
                  <div className="table__class">
                    {student.class}
                  </div>
                  <div className="table__score">
                    <span style={{
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
                    </span>
                  </div>
                  <div className="table__speed">
                    <span style={{
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
                    </span>
                  </div>
                  <div className="table__parents">
                    <img
                      className="table__img-info"
                      src="img/info_outline.svg"
                      alt="sort_by_alpha"
                    />
                    {`${student.parents[0]}, ${student.parents[1]}`}
                  </div>
                  <div className="table__actions table__actions--list">
                    <button
                      className="button"
                      type="button"
                      value={selectedStudentUniqId}
                      onClick={() => handleClick(student.uniq)}
                    >
                      {
                        (isDetailsVisible && selectedStudentUniqId === student.uniq) ? (
                          <img
                            className="table__img-info"
                            src="img/arrow_drop_up.svg"
                            alt="sort_by_alpha"
                          />
                        ) : (
                          <img
                            className="table__img-info"
                            src="img/arrow_drop_down--ligth-gray.svg"
                            alt="sort_by_alpha"
                          />
                        )
                      }
                    </button>
                  </div>
                </li>
                {
                  selectedStudentUniqId === student.uniq
                  && isDetailsVisible
                  && selectedStudent
                  && <StudentDetails student={selectedStudent} />
                }
              </>
            ))}
          </ul>
        </div>
      </div>

      <div className="StudentsList__pagination">
        <div className="StudentsList__rows-count">
          <div className="StudentsList__rows">
            Rows per page:
          </div>
          <div className="StudentsList__counter">
            10
            <img
              className="StudentsList__icon"
              src="img/arrow_drop_down--mid-gray.svg"
              alt="arrow_drop_down"
            />
          </div>
        </div>

        <div className="StudentsList__total-count">
          21-30 of 100
        </div>

        <div className="StudentsList__step">
          <button
            className="button"
            type="button"
            onClick={prevPage}
          >
            <img
              className="StudentsList__step-icon"
              src="img/left.svg"
              alt="arrow_left"
            />
          </button>
          <button
            className="button"
            type="button"
            onClick={nextPage}
          >
            <img
              className="StudentsList__step-icon"
              src="img/rigth.svg"
              alt="arrow_rigth"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
