import React from 'react';
import './App.scss';
import './styles/_reset.scss';
import './styles/utils/_normalize.scss';

import { Header } from './components/Header';
import { Subheader } from './components/Subheader';
import { StudentsList } from './components/StudentsList';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Subheader />
      <StudentsList />
    </div>
  );
};
