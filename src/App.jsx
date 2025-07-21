import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SchemaBuilder from './components/SchemaBuilder';

function App() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">JSON Schema Builder</h2>
      <SchemaBuilder />
    </div>
  );
}

export default App;