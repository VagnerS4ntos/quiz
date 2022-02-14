import React from 'react';
import axios from 'axios';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [numberOfQuestion, setNumberOfQuestion] = React.useState(10);
  const [allCategories, setAllCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [type, setType] = React.useState('');
  const [quiz, setQuiz] = React.useState([]);
  const [allCorrectAnswers, setAllCorrectAnswers] = React.useState([]);
  const [chosenAnswers, setChosenAnswers] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);

  React.useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get('https://opentdb.com/api_category.php');
      setAllCategories(data.trivia_categories);
    }
    getAllCategories();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        numberOfQuestion,
        setNumberOfQuestion,
        allCategories,
        selectedCategory,
        setSelectedCategory,
        difficulty,
        setDifficulty,
        type,
        setType,
        setQuiz,
        quiz,
        setAllCorrectAnswers,
        allCorrectAnswers,
        setChosenAnswers,
        chosenAnswers,
        setCorrectAnswers,
        correctAnswers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
