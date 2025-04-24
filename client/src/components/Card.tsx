import * as React from "react";
import { useState } from "react";
import "../styles/Card.css";
import { Mail, Linkedin, Slack } from "lucide-react";

interface CardProps {
  name: string;
  year: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
  slack?: string;
  university : string; 
  industry : string;
  openStatus : string; 
}

interface ModalProps {
  name: string;
  role: string;
  image: string;
}

const Avatar: React.FC<{ image: string }> = ({ image }) => (
  <img className="fit-img" src={image} alt="avatar_img" />
);

const Modal: React.FC<ModalProps> = ({ name, role, image }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="bottombutton">
        Learn More
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>
              Learn More About {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
            </h2>
            <div className="Main">
              <img className="fit-img" src={image} alt="avatar_img" />
              <h3 className="text"> {role} </h3>
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
};

const Card: React.FC<CardProps> = ({
  name,
  year,
  role,
  image,
  email,
  linkedin,
  slack,
  university,
  industry,
  openStatus,
}) => {
  return (
    <div className="card">
      <div className="elements">
        <Avatar image={image} />
        <div className="text">
          <h1 className="name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <div>
            <h3 className="detail">{year}</h3>
            &#160;
            <h3 className="detail">{role}</h3>
            &nbsp;
            <div className="bottom">
              <Modal image={image} name={name} role={role} />
              {/* &nbsp;
            <Modal value="Research" />  */}
            </div>
          </div>
        </div>

        <button id="star-button" className="star"></button>
        
        <div className="imageContainer">
          <a href={`mailto:${email}`} className="button">
            <Mail />
          </a>
          <a
            href={linkedin}
            target="_blank"
            className="button"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href={slack}
            target="_blank"
            className="button"
            rel="noopener noreferrer"
          >
            <Slack />
          </a>
      
        </div>
      </div>
    </div>
  );
};

export default Card;
