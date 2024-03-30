import Header from './components/header.js';
import Sidebar from "./components/Sidebar";
import SearchBar from './components/searchBar.js';import Sidebar from "./components/Sidebar";
const API_URL = process.env.REACT_APP_API;

function App() {
  return (
    <>
    <div class = "container">
      <Header/>
      <SearchBar/>
      <Sidebar />
    </div>
    </>
  );
}
export default App;
