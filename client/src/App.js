
const API_URL = process.env.REACT_APP_API;
import Header from './Header';


function App() {
  return(
    <>
    <div>
      <Header/>
      <div>Hello world</div>
      <searchBar/>
    </div>
    </>
  )
}
export default App;
