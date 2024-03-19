import * as React from 'react';
import "./SearchBar.css";

// const [searchInput, setSearchInput] = useState("")

// function handleChange(event){
//     event.preventDefault();
//     setSearchInput(event.target.value);
// }

function searchBar(){
    return <>
	<div>
        <form id = "form">
            {/* <input type = "text" 
            placeholder = "Search"
            onchange = "{handleChange}"
            value = "{searchInput}">
            </input> */}
            <button>Search</button>
        </form>
        
    </div>
     </>
}

export default searchBar
