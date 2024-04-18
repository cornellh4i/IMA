import Sidebar from "./components/Sidebar.js";
import AddMemberPage from "./components/AddMemberPage.js";
import SearchBar from "./components/searchBar.js"
import Card from "./components/Card";
import contacts from "./components/contacts";
import Header from "./components/header.js"
import "./App.css"
const API_URL = process.env.REACT_APP_API;

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      year={contact.year}
      role={contact.role}
      image={contact.imgURL}
      // school={contact.school}
      // career={contact.career}
    />
  );
}

function App() {
  return (
    <>
    <div class = "container">
      <Header/>
      <div class = "top">
        <Sidebar />
        <div class = "middle">
        <SearchBar/>
        <div class = "cards">
      {contacts.map(createCard)}
      </div>
        </div>
      </div>
      {/* {contacts.map(createCard)} */}
    </div>
    </>
  );
}
export default App;
