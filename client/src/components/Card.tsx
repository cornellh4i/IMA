import * as React from "react";
import { useState } from "react";
import "../styles/Card.css";
import { ReactComponent as Envelope } from "../assets/card-assets/envelope.svg";
import { ReactComponent as Comment } from "../assets/card-assets/comment.svg";
import { ReactComponent as LinkedInSvg } from "../assets/card-assets/linkedin.svg";
import { ReactComponent as FilledStar } from "../assets/card-assets/filled-star.svg";
import { ReactComponent as BlankStar } from "../assets/card-assets/blank-star.svg";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import defaultProfilePic from "../assets/defaultprofilepic_icon.png";

interface CardProps {
  name: string;
  year: string;
  role: string;
  image: string;
  alumni_id: string;
  user_id: string;
  isSaved?: boolean;
  email?: string;
  linkedin?: string;
  slack?: string;
  onClick?: () => void;
}

const Avatar: React.FC<{ image: string; name: string }> = ({ image, name }) => (
  <div className="avatar">
    <img
      className="fit-img"
      src={image || defaultProfilePic}
      onError={(event) => {
        event.currentTarget.src = defaultProfilePic;
      }}
      alt={`${name} avatar`}
    />
  </div>
);

const Card: React.FC<CardProps> = ({
  name,
  year,
  role,
  image,
  email,
  linkedin,
  user_id,
  isSaved,
  alumni_id,
  onClick,
}) => {
  const displayName =
    name.length > 0 ? name.charAt(0).toUpperCase() + name.slice(1) : "Unknown";

  // local storage star toggle logic, replace with user persistence later

  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isSaved;
    try {
      if (next) {
        supabaseHelpers.saveProfile({
          member_id: user_id,
          saved_id: alumni_id,
        });
      } else {
        supabaseHelpers.unsaveProfile(user_id, alumni_id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const openProfile = () => {
    onClick?.();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProfile();
    }
  };

  return (
    <div className="card">
      <div
        className={`elements ${onClick ? "elements-clickable" : ""}`}
        onClick={openProfile}
        onKeyDown={handleCardKeyDown}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={
          onClick ? `Open profile details for ${displayName}` : undefined
        }
      >
        <Avatar image={image} name={displayName} />
        <div className="text">
          <h1 className="name">{displayName}</h1>
          <button
            type="button"
            className={`fav-btn ${isSaved ? "fav" : ""}`}
            aria-pressed={isSaved}
            onClick={toggleFav}
            title={isSaved ? "Unfavorite" : "Favorite"}
          >
            {isSaved ? (
              <FilledStar className="fav-icon" />
            ) : (
              <BlankStar className="fav-icon" />
            )}
          </button>
          <div className="card-assets" aria-hidden={false}>
            {email && (
              <a
                href={`mailto:${email}`}
                className="asset-btn"
                title="Email"
                aria-label="Email"
                onClick={(e) => e.stopPropagation()}
              >
                <Envelope className="asset-icon" />
              </a>
            )}

            {linkedin && (
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
            )}

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
            {year && <span className="pill">{year}</span>}
            {role && <span className="pill">{role}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
