import React, { useState } from 'react';
import Included from './Components/Included/Included';
import Excluded from './Components/Excluded/Excluded';

import './App.css';

const App = () => {

  const [included, setIncluded] = useState([])
  const [excluded, setExcluded] = useState([])
  const [output, setOutput] = useState(null)

  const onSubmit = () => {
    const price = { included: included.filter(i => i.name && i), excluded: excluded.filter(name => name && { name }) }
    setOutput(JSON.stringify(price))
  }

  return (
    <article className="price-list">
      <div className="container">
        <Included getData={data => setIncluded(data)} />
        <Excluded getData={data => setExcluded(data)} />
        <div className="col">
          <button className="btn" onClick={onSubmit}>Next</button>
        </div>
        <div className="col">
          <div className="output">{output}</div>
        </div>
      </div>
    </article>
  );
}

export default App;
