import React from 'react';
import { useParams } from 'react-router-dom';

const IndividualGames = () => {
  const { gamename, id } = useParams();
  console.log('Im the name ,id for dynamic Games', gamename, id);
  return (
    <div>
      <h1>I'm the Respective Component for {gamename}</h1>
    </div>
  );
};

export default IndividualGames;
