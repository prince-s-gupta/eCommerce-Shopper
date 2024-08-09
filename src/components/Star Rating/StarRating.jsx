import React from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size={30}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
