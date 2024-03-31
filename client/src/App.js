import Header from './components/header.js';
import Sidebar from "./components/Sidebar";
import SearchBar from './components/searchBar.js';
import './App.css'
const API_URL = process.env.REACT_APP_API;

function App() {
  return (
    <>
    <div class = "container">
      <Header/>
      <div class = "top">
        <Sidebar />
        <SearchBar/>
      </div>
    </div>
    </>
  );
}
export default App;
