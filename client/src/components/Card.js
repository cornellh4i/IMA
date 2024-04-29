import * as React from 'react';
import { useState } from "react";
import "./Card.css";
import email_icon from "../assets/email_icon.png"
import linkedin_icon from "../assets/linkedin_icon.png"
import slack_icon from "../assets/slack_icon.png"

function Card(props){
    function Avatar(props) {
        return <img class="fit-img" src={props.image} alt="avatar_img" />;
      }      
      function Modal(props){
        const [modal, setModal] = useState(false);

        const toggleModal = () => {
          setModal(!modal);
        };

        if(modal) {
          document.body.classList.add('active-modal')
        } else {
          document.body.classList.remove('active-modal')
        }

        return (
          <>
            <button onClick={toggleModal} className="bottombutton">
              Learn More
            </button>
      
            {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Learn More About {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </h2>
                    <div className = "Main">
                      <img class="fit-img" src={props.image} alt="avatar_img" />
                      <h3 className = "text"> {props.role}  </h3>
                  </div>                  
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                      perferendis suscipit officia recusandae, eveniet quaerat assumenda
                      id fugit, dignissimos maxime non natus placeat illo iusto!
                      Sapiente dolorum id maiores dolores? Illum pariatur possimus
                      quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                      placeat tempora vitae enim incidunt porro fuga ea.
                  </p>
                  <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </>
        );

      }
    
    return (
      <div className = "card">
        <div className="elements">
            <Avatar image={props.image} />
        <div className="text">
          <h1 className="name">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h1>
          <div>
            <h3 className="detail">{props.year}</h3>
            &#160;
            <h3 className = "detail">{props.role}</h3>
            &nbsp;
            <div className = "bottom">
              <Modal image={props.image} name = {props.name} year = {props.year}role = {props.role}/> 
            {/* &nbsp;
            <Modal value="Research" />  */}
        </div>
          </div>
        </div>
        <div className = "imageContainer">
        <a href = {"mailto:"+props.email} class="button">
          <img src = {email_icon} />
        </a>
        <a href = {props.linkedin} target = "_blank" class="button">
          <img src = {linkedin_icon} />
        </a>
        <a href = {props.slack} target = "_blank" class="button"> 
          <img src = {slack_icon} />
        </a>
        </div>
        </div>
        </div>
      );
}

export default Card;
