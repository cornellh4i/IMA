import SideBar from "./components/Sidebar.js";
import AddMemberPage from "./components/AddMemberPage.js";
const API_URL = process.env.REACT_APP_API;

function App() {
  return (
    <>
      <div>
        {/* <SideBar/> */}
        <AddMemberPage />
      </div>
    </>
  );
}
export default App;
