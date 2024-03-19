import Header from './components/Header.js';
import SearchBar from './components/searchBar.js';
const API_URL = process.env.REACT_APP_API;

function App() {
  return(
    <>
    <div class = "container">
      <Header/>
      <SearchBar/>
    </div>
    </>
  )
}
export default App;
