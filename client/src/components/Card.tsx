import * as React from "react";
import { useState } from "react";
import "../styles/Card.css";
import { ReactComponent as Envelope } from "../assets/card-assets/envelope.svg";
import { ReactComponent as Comment } from "../assets/card-assets/comment.svg";
import { ReactComponent as LinkedInSvg } from "../assets/card-assets/linkedin.svg";
import { ReactComponent as FilledStar } from "../assets/card-assets/filled-star.svg";
import { ReactComponent as BlankStar } from "../assets/card-assets/blank-star.svg";

interface CardProps {
  name: string;
  year: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
  slack?: string;
}

interface ModalProps {
  name: string;
  role: string;
  image: string;
}

const Avatar: React.FC<{ image: string }> = ({ image }) => (
  <div className="avatar">
    <img className="fit-img" src={image} alt="avatar_img" />
  </div>
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
}) => {
  // local storage star toggle logic, replace with user persistence later
  const [fav, setFav] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`fav:${name}`) === "1";
    } catch (err) {
      return false;
    }
  });

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !fav;
    setFav(next);
    try {
      localStorage.setItem(`fav:${name}`, next ? "1" : "0");
    } catch (err) {
      console.error("Failed to set favorite in localStorage", err);
    }
  };

  return (
    <div className="card">
      <div className="elements">
        <Avatar image={image} />
        <div className="text">
          <h1 className="name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <button
            type="button"
            className={`fav-btn ${fav ? "fav" : ""}`}
            aria-pressed={fav}
            onClick={toggleFav}
            title={fav ? "Unfavorite" : "Favorite"}
          >
            {fav ? (
              <FilledStar className="fav-icon" />
            ) : (
              <BlankStar className="fav-icon" />
            )}
          </button>
          <div className="card-assets" aria-hidden={false}>
            <a
              href={`mailto:${email}`}
              className="asset-btn"
              title="Email"
              aria-label="Email"
              onClick={(e) => e.stopPropagation()}
            >
              <Envelope className="asset-icon" />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="asset-btn"
              title="LinkedIn"
              aria-label="LinkedIn"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkedInSvg className="asset-icon" />
            </a>

            <button
              type="button"
              className="asset-btn message-btn"
              title="Message"
              aria-label="Message"
              onClick={(e) => e.stopPropagation()}
            >
              <Comment className="asset-icon message-icon" />
            </button>
          </div>

          {/*year graduated, major, team for pills*/}
          <div className="chips">
            <span className="pill">IMA</span>
            <span className="pill">Developer</span>
            <span className="pill">2028</span>
            <span className="pill">Technical Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
