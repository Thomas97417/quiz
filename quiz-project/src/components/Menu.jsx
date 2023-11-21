const Menu = ({ onStartQuiz, setSelectedTheme, setNumberQuestion }) => {

  const handleThemeChange = (event) => {
    const { value } = event.target;
    setSelectedTheme(value);
  };

  const handleNumberChange = (e) => {
    setNumberQuestion(e.target.value)
  }

  return (
    <div id="menu">
      <h1>Quiz Culture G</h1>
      <label htmlFor="themeSelect">Sélectionner un thème :</label>
      <select id="themeSelect" onChange={handleThemeChange}>
        <option value="default">En vrac</option>
        <option value="history">Histoire</option>
        <option value="science">Science</option>
        <option value="sport">Sport</option>
        <option value="videoGame">Jeux vidéos</option>
        <option value="cinema">Cinema</option>
      </select>
      <label htmlFor="nbSelect">Nombre de questions :</label>
      <select id="nbSelect" onChange={handleNumberChange}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <label htmlFor="nbSelect">Difficulté :</label>
      <select id="difficulty">
        <option value="easy">Facile</option>
        <option value="medium">Moyen</option>
        <option value="hard">Difficile</option>
      </select>
      <button onClick={onStartQuiz}>Commencer le quiz</button>
      {/* Ajoutez d'autres options de menu si nécessaire */}
    </div>
  );
};

export default Menu;
