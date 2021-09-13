import React, { useEffect, useState } from 'react';
import { getStoreys } from './services/services';
import Story from './components/Story';
import Header from './components/Header';

function App() {
  const [storeys, setStoreys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getStoreys().then(setStoreys);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header isLoading={isLoading} />
      <div className='container'>
        <div className='list-group mt-5 pt-3 mb-3'>
          {storeys.map((s) => (
            <Story
              key={s.id}
              title={s.title}
              by={s.by}
              score={s.score}
              time={s.time}
              url={s.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
