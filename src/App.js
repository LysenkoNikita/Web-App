import React from 'react';
import Button from './Components/Button';
import Container from './Components/Container';
import Navigation from './Components/Navigation';


const App = () => {
  return (
    <div>
      <Navigation display="flex"/>
        <Container>
          <Button onClick={() => alert("Кнопка нажата")}>Нажми на меня</Button>
        </Container>
    </div>
  );
}

export default App;