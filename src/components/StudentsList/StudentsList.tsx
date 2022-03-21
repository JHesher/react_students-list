import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CSVLink } from 'react-csv';

import { getStudents, getSortedBy } from '../../api/students';
import { StudentDetails } from '../StudentDetails';

import './StudentsList.scss';

export const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [size, setSize] = useState('10');

  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [sortBy, setSortBy] = useState('');
  const [sortDir, setSortDir] = useState(0);

  const [csvData, setCSVData] = useState<(string | number | string[] | Test[])[][]>([]);

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
    const values = data.map(student => Object.values(student));

    csvRows.push([...headers], ...values);

    return csvRows;
  };

  const loadStudents = async () => {
    const dataFromServer = await getStudents(page, size);

    setStudents(getStudentsByQuery(dataFromServer.data));
    const dataForDownload = csvmaker(dataFromServer.data);

    setCSVData(dataForDownload);
  };

  const sorter = async () => {
    const dataFromServer = await getSortedBy(page, sortBy, sortDir, size);

    setStudents(dataFromServer.data);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const handleClick = (id: number) => {
    if (selectedStudentId !== id) {
      setSelectedStudentId(id);
    } else {
      setSelectedStudentId(0);
    }

    const setStudent = students
      .find(student => student.id === id) || null;

    setSelectedStudent(setStudent);

    if (selectedStudentId === id || selectedStudentId === 0) {
      setDetailsVisible(!isDetailsVisible);
    }
  };

  const setSorter = (value: string) => {
    if (sortDir === 0) {
      setSortDir(-1);
    } else {
      setSortDir(sortDir * -1);
    }

    setSortBy(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    loadStudents();
  }, [page, query, size]);

  useEffect(() => {
    sorter();
  }, [sortBy, sortDir]);

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
              name="name"
              onClick={(event) => setSorter(
                (event.currentTarget as HTMLButtonElement).name,
              )}
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
          </div>

          <div className="table__class">
            <span>Class</span>
            <button
              className="button"
              type="button"
              name="class"
              onClick={(event) => setSorter(
                (event.currentTarget as HTMLButtonElement).name,
              )}
            >
              <img
                src="img/unfold_more.svg"
                alt="sort_by_alpha"
              />
            </button>
          </div>

          <div className="table__score">
            <span>Av.Score,%</span>
            <button
              className="button"
              type="button"
              name="score"
              onClick={(event) => setSorter(
                (event.currentTarget as HTMLButtonElement).name,
              )}
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
              name="speed"
              onClick={(event) => setSorter(
                (event.currentTarget as HTMLButtonElement).name,
              )}
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
              <li
                key={uuidv4()}
              >
                <div className="table__item">
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
                      className="table__button button"
                      type="button"
                      value={selectedStudentId}
                      onClick={() => handleClick(student.id)}
                    >
                      {
                        (isDetailsVisible && selectedStudentId === student.id) ? (
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
                </div>
                {
                  selectedStudentId === student.id
                  && isDetailsVisible
                  && <StudentDetails student={selectedStudent} />
                }
              </li>
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
            <select
              onChange={handleChange}
              value={size}
              className="App__user-selector"
            >
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
              <option value="6"> 6 </option>
              <option value="7"> 7 </option>
              <option value="8"> 8 </option>
              <option value="9"> 9 </option>
              <option value="10"> 10 </option>
            </select>
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
