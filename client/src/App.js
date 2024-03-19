
import Header from './components/Header.js';
import searchBar from './components/searchBar.js';
const API_URL = process.env.REACT_APP_API;


function App() {
  return(
    <>
    <div>
      <Header/>
      <searchBar/>
    </div>
    </>
  )
}
export default App;
