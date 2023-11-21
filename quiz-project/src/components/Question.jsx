import React, { useState, useEffect } from 'react'

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Question = ({ question, onAnswer, selectedOption, setSelectedOption }) => {
  const { id, text, options, correctAnswer } = question;

  // Utiliser le hook useState pour mémoriser les options mélangées initiales
  const [shuffledOptions, setShuffledOptions] = useState(shuffleArray(options));

  // Si la question change, remélanger les options
  useEffect(() => {
    setShuffledOptions(shuffleArray(options));
  }, [question]);
    
  
  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
  };

  const handleAnswerClick = () => {
    const isCorrect = selectedOption === correctAnswer;
    onAnswer(selectedOption, isCorrect);
  };
  
  return (
    <div id="form">
      <p>{text}</p>
      <form>
        {shuffledOptions.map(option => (
          <div key={option}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </div>
        ))}
      </form>
      <button className='button' onClick={handleAnswerClick} disabled={!selectedOption}>
        Répondre
      </button>
    </div>
  );
};

export default Question