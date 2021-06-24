import type { Repo } from "../../src/components/repos/repos";
import { getRepos } from "../queries";

export const fetchRepos = async (
  token: string,
  queryString: string,
  rows: number,
  nextCursor: string
): Promise<{ data: Repo[]; nextCursor: string; hasNextPage: boolean }> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `bearer ${token}`);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: getRepos,
      variables: nextCursor
        ? { queryString, rows, start: nextCursor }
        : { queryString, rows },
    }),
  });
  const jsonResponse = await response.json();
  const data: Repo[] = jsonResponse.data.search?.edges;
  const hasNextPage = jsonResponse.data.search?.pageInfo?.hasNextPage;
  const endCursor = jsonResponse.data.search?.pageInfo?.endCursor;

  return { data, nextCursor: endCursor, hasNextPage };
};
