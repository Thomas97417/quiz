import React, { useState, useEffect, useMemo } from 'react';
import Question from './Question';
import questionsData from '../questionsData';
import Menu from './Menu';
import MemoizedFetch from './MemoizedFetch';
import Timer from './Timer';

const TIME_ALLOWED = 180;

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
  
const Quiz = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [showMenu, setShowMenu] = useState(true);
  const shuffledQuestions = useMemo(() => shuffleArray(questionsData[selectedTheme]), [selectedTheme]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIME_ALLOWED);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [numberQuestion, setNumberQuestion] = useState(5)

  const handleAnswer = (selectedOption, isCorrect) => {
    // setUserAnswers(prevAnswers => [...prevAnswers, { questionId: currentQuestion, selectedOption, isCorrect }]);
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    // if (currentQuestion < shuffledQuestions.length - 1) {
    if (currentQuestion < numberQuestion - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedOption(''); // Réinitialiser l'option sélectionnée
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setTimeRemaining(TIME_ALLOWED);
    setQuizCompleted(false);
    setShowMenu(true);
    setSelectedTheme("default");
    setNumberQuestion(5);
  };

  const startQuiz = () => {
    setShowMenu(false);
  };

  return (
    <main>
      {showMenu ? (
        <Menu onStartQuiz={startQuiz} setSelectedTheme={setSelectedTheme} setNumberQuestion={setNumberQuestion}/>
      ) : (
        <div id="info2">
          {quizCompleted ? (
            <div id="win">
              <h2>Quiz Terminé !</h2>
              <p>Votre score est de {score} sur {numberQuestion}.</p>
              <p>Félicitations !</p>
              <button onClick={resetQuiz}>Recommencer</button>
            </div>
          ) : (
            <div id="info">
              {timeRemaining > 0 ? (
              <React.Fragment>
                <h1>QCM Culture G</h1>
                <div id="score">Score: {score}{currentQuestion > 0 && '/' + currentQuestion}</div>
                <div id="question">Question {currentQuestion + 1}/{numberQuestion}</div>
                <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} showMenu={showMenu} />
                <Question
                  question={shuffledQuestions[currentQuestion]}
                  onAnswer={handleAnswer}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <MemoizedFetch />
              </React.Fragment>
              ) : (
                <div id="lose">
                  <h2>Temps écoulé !</h2>
                  <p>Vous n'avez pas répondu à toutes les questions à temps.</p>
                  <p>Votre score est de {score} sur {numberQuestion}.</p>
                  <button onClick={resetQuiz}>Recommencer</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Quiz