import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../shared/component/header/header.tsx';
import WrongPage from './wrong-page/wrong-page.tsx';
import Home from './home/home.tsx';
import Employees from './employees/employees.tsx';

function App() {
  return (
    <>
      <Router>
        {/*<Provider store={store}>*/}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/error" element={<WrongPage />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
        {/*</Provider>*/}
      </Router>
    </>
  );
}

export default App;
