import React, { useEffect, useState } from 'react';
import { getStoresIds } from './services/services';
import { Story } from './components/Story';

function App() {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    getStoresIds().then((data) => setStoryIds(data));
  }, []);

  return (
    <div className='container mt-3'>
      <ol>
        {storyIds.map((id, i) => {
          return i < 20 ? <Story key={id} storyId={id} /> : null;
        })}
      </ol>
    </div>
  );
}

export default App;
