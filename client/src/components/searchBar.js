import * as React from 'react';
import "./SearchBar.css";

// const [searchInput, setSearchInput] = React.useState("")

// function handleChange(event){
//     event.preventDefault();
//     setSearchInput(event.target.value);
// }

function searchBar(){
    return (
        <div class = "searchBar">
            <form id = "form">
                <input type = "text" 
                id = "searchInput"
                placeholder = "Search"
                // onchange = "{handleChange}"
                // value = "{searchInput}"
                >
                </input>
                <button id = "submit">Search</button>
            </form>
        </div>
    )
	
}

export default searchBar;