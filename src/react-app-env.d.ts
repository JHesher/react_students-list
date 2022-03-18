/// <reference types="react-scripts" />

type List = {
  totalPages: number,
  data: Student[],
};

type Student = {
  name: string,
  id: number,
  class: string,
  score: string,
  speed: string,
  parents: string[],
  tests: Test[],
  uniq: string,
};

type Test = {
  label: string,
  score: number,
  speed: string,
  total: number,
  expSpeed: string,
  concept: string,
  date: string,
  abcent: boolean,
};
