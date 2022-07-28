import React from 'react';
import './playing-card.css';

const PlayingCard = ({ emoji }) => {
  return <div className="playing-card">{emoji}</div>;
};

export default PlayingCard;
