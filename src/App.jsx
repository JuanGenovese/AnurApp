import React, { useEffect, useState } from 'react';
import FrogList from './components/FrogList';
import Header from './components/Header';
import Loading from './components/Loading';
import FrogProvider from './context/FrogContext';
import './css/app.css';

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <FrogProvider>

      <div className={loading ? "" : "hidden-page"} >
        <Loading loading={loading}/>
      </div>

      <div className={!loading ? "" : "hidden-page"} >
        <Header />
        <FrogList />
      </div>
      
    </FrogProvider >
  );
}

export default App;