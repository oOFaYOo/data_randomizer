import React from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";

function App() {
  return (
    <div className={'relative w-full h-full flex flex-col bg-emerald-700'}>
      <TopPanel />
      <Table />
    </div>
  );
}

export default App;
