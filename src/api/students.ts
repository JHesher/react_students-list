export const BASE_URL = 'https://test-task-j.herokuapp.com/data';

export async function getStudents(page: number): Promise<List> {
  const response = await fetch(`${BASE_URL}?page=${page}&size=5`);

  return response.json();
}

export async function getSortedBy(page: number, sortBy: string, dir: number): Promise<List> {
  const response = await fetch(`${BASE_URL}?page=${page}&size=5&sortBy=${sortBy}&sortDir=${dir}`);

  return response.json();
}
