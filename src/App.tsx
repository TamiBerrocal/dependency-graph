import { useState } from 'react';
import './App.css';
import { DependenciesInput, Graph, Header } from './components';

function App() {
  const [showGraph, setShowGraph] = useState(false);
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <Header />
      <DependenciesInput
        onSubmit={(input) => {
          setInput(input);
          setShowGraph(true);
        }}
        onInputChange={() => setShowGraph(false)}
      />
      {/* Show the graph when the button is clicked and hide it when the input is changed */}
      {showGraph && <Graph dependencies={input} />}
    </div>
  );
}

export default App;
