import React, { useEffect, useState } from 'react';
import { getStoreys } from './services/services';
import Story from './components/Story';
import Header from './components/Header';
import Container from './Layouts/Container';
import ListGroup from './Layouts/ListGroup';

function App() {
  const [storeys, setStoreys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getStoreys().then(setStoreys);
    setIsLoading(false);
  };

  const updateStoreys = () => {
    setIsLoading(true);
    fetchData();
  };

  return (
    <>
      <Container>
        <Header isLoading={isLoading} handleClick={updateStoreys} />
        <ListGroup>
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
        </ListGroup>
      </Container>
    </>
  );
}

export default App;
