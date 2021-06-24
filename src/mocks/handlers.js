// src/mocks/handlers.js
import { graphql } from "msw";

export const handlers = [
  graphql.query("getRepos", (req, res, ctx) => {
    const queryString = req.body.variables.queryString;

    if (!queryString) {
      return res(
        ctx.status(200),
        ctx.data({
          search: {
            edges: [],
          },
        })
      );
    }

    return res(
      ctx.data({
        search: {
          edges: [
            {
              node: {
                name: "freeCodeCamp",
                stargazers: { totalCount: 325354 },
                forks: { totalCount: 25087 },
              },
            },
            {
              node: {
                name: "vue",
                stargazers: { totalCount: 184781 },
                forks: { totalCount: 28638 },
              },
            },
            {
              node: {
                name: "react",
                stargazers: { totalCount: 170327 },
                forks: { totalCount: 32954 },
              },
            },
          ],
        },
      })
    );
  }),
];
