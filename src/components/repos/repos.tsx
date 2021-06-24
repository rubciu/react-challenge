import React, { useEffect, useState, SetStateAction } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import { GITHUB_TOKEN } from "../../config";
import Filters from "../filters/filters";
import { fetchRepos } from "../../helpers";

import styles from "./repos.module.css";
import { useRef } from "react";

export type Repo = {
  node: {
    name: string;
    stargazers: {
      totalCount: number;
    };
    forks: {
      totalCount: number;
    };
  };
};

type ReposProps = {
  search: string;
  setSearch: (search: SetStateAction<string>) => void;
};

const Repos = ({ search, setSearch }: ReposProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<"error" | "idle">("idle");
  const [rows, setRows] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pagination = useRef("");

  const getRepos = async () => {
    setStatus("idle");
    setLoading(true);

    try {
      const reposData = await fetchRepos(
        GITHUB_TOKEN,
        search,
        rows,
        pagination.current
      );
      pagination.current = reposData.nextCursor;

      setRepos(reposData.data);
      setHasNextPage(reposData.hasNextPage);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (hasNextPage) {
      getRepos();
    }
  }, [search, rows, hasNextPage]);

  return (
    <div className={styles.repos}>
      <Filters setSearch={setSearch} setRows={setRows} />

      <div className={styles.progress}>
        {loading ? (
          <LinearProgress className={styles.progress} color="secondary" />
        ) : null}
      </div>

      {repos && repos.length ? (
        <div className={styles.list}>
          <ul>
            {repos.map((repo: Repo, index: number) => (
              <li key={index} data-testid="repo">
                {repo.node.name} - 🌟 {repo.node.stargazers.totalCount} - 🍴{" "}
                {repo.node.forks.totalCount}
              </li>
            ))}
          </ul>
        </div>
      ) : !loading && status === "idle" ? (
        <p>Sorry we couldn't find any repository</p>
      ) : status === "error" ? (
        <Alert severity="error">
          There has been an issue trying to fetch repositories, please try again
        </Alert>
      ) : null}
      <div className={styles.button}>
        <Button variant="contained" color="primary" onClick={() => getRepos()}>
          Fetch {rows} other repos
        </Button>
      </div>
    </div>
  );
};

export default Repos;
