import React, { useEffect } from 'react'




const Timer = ({ timeRemaining, setTimeRemaining, showMenu }) => {

    useEffect(() => {
        // N'initier le timer que lorsque showMenu passe à false
        if (!showMenu) {
          const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
          }, 1000);
      
          // Nettoyer le timer lorsque le composant est démonté ou showMenu repasse à true
          return () => clearInterval(timer);
        }
      }, [showMenu]);
    
    return (
      <div>
        <p id="timer">Temps: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} </p>
      </div>
    );
  };

export default Timer