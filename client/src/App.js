import SideBar from "./components/Sidebar.js";
import AddMemberPage from "./components/AddMemberPage.js";
import Card from "./components/Card";
import contacts from "./components/contacts";

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
      <div>
        {/* <SideBar/> */}
        <div class = "middle">
        <AddMemberPage />
        <div class = "cards">
      {contacts.map(createCard)}
      </div>
        </div>
        {/* {contacts.map(createCard)} */}
    </div>
    </>
  );
}
export default App;
