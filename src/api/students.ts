export const BASE_URL = 'https://test-task-j.herokuapp.com/data';

export async function getStudents(page: number, size: string): Promise<List> {
  const response = await fetch(`${BASE_URL}?page=${page}&size=${size}`);

  return response.json();
}

export async function getSortedBy(
  page: number,
  sortBy: string,
  dir: number,
  size: string,
): Promise<List> {
  const response = await fetch(`${BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${dir}`);

  return response.json();
}
