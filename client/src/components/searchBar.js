import * as React from 'react';
import "./SearchBar.css";

const [searchInput, setSearchInput] = useState("")

function handleChange(event){
    event.preventDefault();
    setSearchInput(event.target.value);
}

function searchBar(){
    return <>
	<div>
        <input type = "text" 
        placeholder = "Search"
        onchange = "{handleChange}"
        value = "{searchInput}">

        </input>
    </div>
     </>
}

export default searchBar
