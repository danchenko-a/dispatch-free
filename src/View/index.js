import React from "react";

const View = ({ loading = false, data = [], loadData }) => {
  return (
    <div>
      <p>Loading is {loading ? "in process" : "done"}!</p>
      <button onClick={loadData} disabled={loading}>
        Load teammembers
      </button>
      <p>Team members are:</p>
      {!data.length && <p>empty...</p>}
      {!!data.length && data.map((name, i) => <li key={String(i)}>{name}</li>)}
      <ul></ul>
    </div>
  );
};

export default View;
