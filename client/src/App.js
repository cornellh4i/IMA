import Sidebar from "./components/Sidebar";
const API_URL = process.env.REACT_APP_API;

function App() {
  return (
    <>
      <div class="container">
        <Sidebar />
      </div>
    </>
  );
}
export default App;
