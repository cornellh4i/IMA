import * as React from 'react';
import "./SearchBar.css";

function SearchBar(){
    return (
        <div className = "searchBar">
            <form id = "form">
                <input type = "text" 
                id = "searchInput"
                placeholder = "Search"
                >
                </input>
                <button id = "submit">Search</button>
            </form>
        </div>
    )
	
}

export default SearchBar;