import * as React from 'react';
import "./Card.css";

function Card(props){
    function Avatar(props) {
        return <img className="circle-img" src={props.image} alt="avatar_img" />;
      }      
    // function Details(props) {
    //     return <p className="info">{props.detailInfo}</p>;
    //   }      
    return (
        <div className="card">
            <Avatar image={props.image} />
        <div className="text">
          <div className="top">
        <h1 className="name">{props.name}</h1>
          </div>
          <div className="bottom">
            <h3 className="detail">{props.year}</h3>
            &#160;
            <h3 className = "detail">{props.role}</h3>
          {/* <button>startups</button>
          <button>research</button> */}
          </div>
        </div>
        </div>
      );
}

export default Card;