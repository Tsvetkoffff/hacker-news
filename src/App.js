import React, { useEffect, useState } from 'react';
import { getStoresIds, getStory } from './services/services';
import Story from './components/Story';
import Loader from './components/Loader';

function App() {
  const [storeys, setStoreys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const ids = await getStoresIds();
      const cutIds = ids.slice(0, 100);
      const storeysArr = await Promise.all(
        cutIds.map((id) => {
          return getStory(id).then((story) => story);
        })
      );
      const sortStoreys = storeysArr.sort((a, b) => a.time - b.time);
      setStoreys(sortStoreys);
      setIsLoading((i) => {return !i})
    }
    fetchData();
  }, []);

  if (!isLoading) {
    return (
      <div className='container mt-1 mb-1'>
        <div className='list-group'>
          {storeys.map((s) => (
            <Story
              key={s.id}
              title={s.title}
              by={s.by}
              score={s.score}
              time={s.time}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default App;
