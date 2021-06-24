export const getRepos = `query getRepos($queryString:String!, $rows: Int!, $start:String) { 
  search(query: $queryString, type: REPOSITORY, first: $rows, after: $start) { 
    pageInfo {
      startCursor
      hasNextPage
      endCursor
    }
    edges {
      node {
        ... on Repository {
          name
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
        }
      }
    }
  }
}`;
