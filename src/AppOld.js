import React from 'react';
import './App.css';
import { getStoreys } from './services/services';
import StoreysList from './components/StoreysList';
import Story from './components/Story';
import Header from './components/Header';
import Container from './Layouts/Container';
import ListGroup from './Layouts/ListGroup';

function App() {
  const [storeys, setStoreys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3.6e6);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    await getStoreys().then(setStoreys);
    setIsLoading(false);
  };

  const updateStoreys = () => {
    fetchData();
  };

  return (
    <Container>
      <Header isLoading={isLoading} handleClick={updateStoreys} />
      <Switch>
        <Route path='/' exact>
          <ListGroup>
            {storeys.map((s) => (
              <StoreysList
                key={s.id}
                title={s.title}
                by={s.by}
                score={s.score}
                time={s.time}
                url={s.url}
                id={s.id}
              />
            ))}
          </ListGroup>
        </Route>
        <Route path='/:id' component={Story}></Route>
      </Switch>
    </Container>
  );
}

export default App;
