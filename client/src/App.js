
const API_URL = process.env.REACT_APP_API;
import Header from './components/Header.js';
import searchBar from './components/searchBar.js';


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
