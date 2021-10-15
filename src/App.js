import React from 'react';
import { Layout } from 'antd';
import './App.css';
import AppRouter from './components/AppRouter/AppRouter';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Layout>
      <Layout.Header className='header'>
        <Navbar />
      </Layout.Header>
      <Layout.Content className='main'>
        <AppRouter />
      </Layout.Content>
      <Layout.Footer className='footer'>
        Developed by Slava Tsvetkoffff
      </Layout.Footer>
    </Layout>
  );
}

export default App;
