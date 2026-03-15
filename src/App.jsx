import React from 'react';
import Layout from './components/Layout';
import ProjectHeader from './components/ProjectHeader';
import Board from './components/Board';

import { ToastProvider } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <Layout>
        <ProjectHeader />
        <Board />
      </Layout>
    </ToastProvider>
  );
}

export default App;
