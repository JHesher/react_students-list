export const BASE_URL = 'https://test-task-j.herokuapp.com/data';

export async function getStudents(page: number): Promise<List> {
  const response = await fetch(`${BASE_URL}?page=${page}&size=10`);

  return response.json();
}

export async function sortedByName(page: number, dir: number): Promise<List> {
  const response = await fetch(`${BASE_URL}?page=${page}&size=10&sortBy=name&sortDir=${dir}`);

  return response.json();
}
