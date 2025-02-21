import React, { useState } from 'react';
import Container from './Components/Container';
import Navigation from './Components/Navigation';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Menu from './Components/Menu';
import Content from './Components/Content';


const App = () => {
  const [currentLab, setCurrentLab] = useState(null);

  const labs = [
    {
      id: 1,
      title: 'Лабораторная 1: Введение в React',
      content: 'В этой работе мы изучаем основы React...'
    },
    {
      id: 2,
      title: 'Лабораторная 2: Компоненты и пропсы',
      content: 'Работа посвящена созданию компонентов...'
    },
    {
      id: 3,
      title: 'Лабораторная 3: Состояние и жизненный цикл',
      content: 'Изучение управления состоянием компонентов...'
    }
  ];
  return (
      <div style={{ minHeight: '100vh' }}>
        <Header> <Navigation /></Header>

        <Container style={{
          display: 'flex',
          padding: '20px',
          paddingBottom: '60px' // Чтобы Footer не перекрывал
        }}>
          <Menu labs={labs} onSelect={(id) => {
            const selected = labs.find(lab => lab.id === id);
            setCurrentLab(selected);
          }} />

          <Content lab={currentLab} />
        </Container>

        <Footer />
      </div>
  );
}

export default App;