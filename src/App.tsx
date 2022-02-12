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
        showClearButton={showGraph} // Show the "Clear" button only when the graph is displayed on screen
        onShowClick={(input) => {
          setInput(input);
          setShowGraph(true);
        }}
        onClearClick={() => setShowGraph(false)}
      />
      {/* Show the graph when the "Show" button is clicked and hide it when the "Clear" button is clicked */}
      {showGraph && <Graph dependencies={input} />}
    </div>
  );
}

export default App;
