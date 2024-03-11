import { useEffect, useState } from 'react';

import MultiActionAreaCard from "./components/card.js";
import Headers from "./components/header.js";
import SearchBar from "./components/search.js";
import LandingPage from './components/landing.js';

const API_URL = process.env.REACT_APP_API;


function App() {
  const [data, setData] = useState('No data :(');

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/hello/`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data.msg);
    }
    getData();
  }, []);

  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);



  return (
    <>
      <>
        <Headers />
      </>
      <SearchBar />
      <>
        <LandingPage />
      </>
    </>
  );
}
export default App;
