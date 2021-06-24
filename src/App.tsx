import React, { useState } from "react";

import Repos from "./components/repos/repos";

import "./App.css";

const App = (): JSX.Element => {
  const [search, setSearch] = useState<string>(
    "language:javascript stars:>1600"
  );

  return (
    <div className="App">
      <Repos search={search} setSearch={setSearch} />
    </div>
  );
};

export default App;
