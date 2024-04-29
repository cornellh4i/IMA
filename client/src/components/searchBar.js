import * as React from 'react';
import { useState, useEffect } from 'react';
import "./SearchBar.css";
import Card from './Card';

// Logic
// when page opens up, load all the data
// onSubmit, rerender the page

function SearchBar(input){
    const [members, setMembers] = useState([]);

    function createCard(member) {
        return (
            <Card
                name={member.name}
                year={member.year}
                role={member.role}
                major={member.major}
                pronouns={member.pronouns}
                location={member.location}
                linkedin={member.linkedin}
                slack={member.slack}
                email={member.email}
                image={member.imgURL}
                key={member.m_id}
            />
        );
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const apiURL = "http://localhost:8000/getMember/";
            fetch(apiURL)
            .then(res => res.json())
            .then(data => setMembers(data))
            .catch(e => console.log("error fetching", e));
        }
        fetchData();
    }, []);
    
    const SearchedMember = (searchQuery) => { 
        var fullURL = "";
        if (searchQuery === ""){
            fullURL = "http://localhost:8000/getMember/";
        }
        else {
            const apiURL = "http://localhost:8000/getMemberByName/";
            fullURL = `${apiURL}${searchQuery.toLowerCase()}`;
        }
        fetch(fullURL)
        .then(res => res.json())
        .then(data =>setMembers(data))
        .catch(e => console.log("error fetching", e));
    }

    const handleSubmit=(event) =>{
        event.preventDefault();
        const newQuery = event.target.name.value;
        SearchedMember(newQuery);
    }
    
    return (
        <div>
            <div className = "searchBar" onSubmit={handleSubmit}>
                <form id = "form" >
                    <input type = "text" 
                    name='name'
                    id = "searchInput"
                    placeholder = "enter a name"
                    >
                    </input>
                    <button id = "submit">Search</button>
                </form>
                <div className="cards">
                    {members.map(createCard)}
                </div>
            </div>
            
        </div>
    )
	
}

export default SearchBar;