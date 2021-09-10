import React, { useEffect, useState } from 'react';
import { getStoresIds, getStory } from './services/services';
import Story from './components/Story';

function App() {
  const [storeys, setStoreys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const ids = await getStoresIds();
      const cutIds = ids.slice(0, 50);
      console.log(cutIds);
      const storeysArr = await Promise.all(
        cutIds.map((id) => {
          return getStory(id).then((story) => story);
        })
      );
      setStoreys(storeysArr);
      setIsLoading(!isLoading)
    }
    fetchData();
  }, []);

  if(!isLoading){
  return (
    <div className='container mt-3'>
      <div className='list-group'>
        {storeys.map((s) => (
          <Story
            key={s.id}
            title={s.title}
            time={s.time}
            by={s.by}
            score={s.score}
          />
        ))}
      </div>
    </div>
  );
        } else {
          return <p>Loading</p>
        }
}

export default App;
