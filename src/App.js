import "./App.css";
import HomePage from './HomePage';
import ErrorBoundary from './ErrorBoundary'
import { useState } from "react";

function App() {
let [falcone , setFalcone] = useState(Math.floor(Math.random() * 6));
console.log("falcone is at ", falcone );

  return (
    <ErrorBoundary> 
      <HomePage falcone = {falcone} SetFalcone = {(e) => setFalcone(e)}  />
      </ErrorBoundary>
  )
  
}

export default App;
