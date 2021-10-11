import React from 'react';
import { Layout, Divider } from 'antd';
import './App.css';
import AppRouter from './components/AppRouter/AppRouter';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Layout className='my-layout'>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Content className='container' style={{ marginTop: 20 }}>
        <AppRouter />
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Divider />
        Developed by Slava Tsvetkoffff
      </Layout.Footer>
    </Layout>
  );
}

export default App;
