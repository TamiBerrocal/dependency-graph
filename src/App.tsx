import { useState } from 'react';
import './App.css';
import { DependenciesInput, Graph, Header } from './components';

function App() {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="App">
      <Header />
      <DependenciesInput
        onClick={(event) => {
          console.log('click', event);
          setShowGraph(true);
        }}
      />
      {showGraph && <Graph />}
    </div>
  );
}

export default App;
