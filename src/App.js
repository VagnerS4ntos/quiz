import React from 'react';
import NumberOfQuestions from './components/NumberOfQuestions';
import Categries from './components/Categories';
import Difficulty from './components/Difficulty';
import Type from './components/Type';
import { Button } from '@mui/material';
import { GlobalContext } from './GlobalStorage';
import axios from 'axios';
import ReactLoading from 'react-loading';
import _ from 'lodash';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-scroll';

function App() {
  const global = React.useContext(GlobalContext);
  const [gettingData, setGettingData] = React.useState(false);
  const [finishQuiz, setFinishQuiz] = React.useState(false);

  async function generateQuiz() {
    setGettingData(false);
    setFinishQuiz(false);
    try {
      setGettingData(true);
      global.setAllCorrectAnswers([]);
      global.setChosenAnswers([]);
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=${global.numberOfQuestion}&category=${global.selectedCategory}&difficulty=${global.difficulty}&type=${global.type}&encode=url3986`,
      );

      const { results } = data;

      //Add the correct answer to incorrect answers array
      _.map(results, (result) => {
        result.incorrect_answers.push(result.correct_answer);
        return (result.incorrect_answers = _.shuffle(result.incorrect_answers));
      });

      //Rename 'incorrect_answers' to 'all_answers'
      function renameKey(array) {
        return _.mapKeys(array, function (value, key) {
          if (key === 'incorrect_answers') return 'all_answers';
          return key;
        });
      }
      const allQuestions = _.map(results, renameKey);

      global.setQuiz(allQuestions);

      //Get all correct answers
      _.forEach(results, (item) => {
        global.setAllCorrectAnswers((correctAnswer) => [
          ...correctAnswer,
          item.correct_answer,
        ]);
      });

      setGettingData(false);
    } catch (error) {
      console.log(error.message);
      setGettingData(false);
    }
  }

  function checkAnswers() {
    const correctAnswers = [];
    global.chosenAnswers.forEach((chosenAnswer) => {
      global.allCorrectAnswers.forEach((correctAnswer) => {
        if (chosenAnswer.answer === correctAnswer) {
          correctAnswers.push(chosenAnswer);
        }
      });
    });
    global.setCorrectAnswers(correctAnswers);

    //Paint background
    const allQuestions = document.querySelectorAll('.question');
    global.chosenAnswers.forEach((answer, index, array) => {
      if (answer.answer === global.allCorrectAnswers[index]) {
        allQuestions[index].style.border = '4px solid #0f0';
      } else {
        allQuestions[index].style.border = '4px solid #f00';
      }
    });

    //Disable input answers
    const allInputAnswers = document.querySelectorAll('.inputAnswer');
    allInputAnswers.forEach((item) => {
      item.setAttribute('disabled', true);
    });

    setFinishQuiz(true);
  }

  function getAnswer({ target }) {
    let allAnswers = '';
    if (global.chosenAnswers.length > 0) {
      allAnswers = global.chosenAnswers;

      allAnswers.forEach((item) => {
        if (item.index.toString() === target.dataset.position.toString()) {
          item.answer = target.value;
        } else {
          allAnswers = [
            { index: target.dataset.position, answer: target.value },
          ];
        }
      });
    }

    if (allAnswers.length === 0) {
      global.setChosenAnswers((chosenAnswer) =>
        _.uniqWith(
          _.sortBy(
            [
              ...chosenAnswer,
              { index: target.dataset.position, answer: target.value },
            ],
            (answer) => {
              return answer.index;
            },
          ),
          _.isEqual,
        ),
      );
    } else {
      global.setChosenAnswers((chosenAnswer) =>
        _.uniqWith(
          _.sortBy([...chosenAnswer, ...allAnswers], (answer) => {
            return answer.index;
          }),
          _.isEqual,
        ),
      );
    }
  }

  return (
    <div className="container mx-auto py-10 px-5" id="top">
      <h1 className="text-5xl mb-10">QUIZ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <NumberOfQuestions />
        <Categries />
        <Difficulty />
        <Type />
      </div>

      <Button
        variant="contained"
        size="large"
        sx={{ fontSize: '1.2rem', marginTop: '2rem' }}
        onClick={generateQuiz}
      >
        Generate quiz
      </Button>

      {gettingData && (
        <div className="grid place-content-center mt-52">
          <ReactLoading type="spin" color="#1976d2" height={200} width={200} />
        </div>
      )}

      {!gettingData && global.quiz.length > 0 && (
        <div className="mt-5">
          <h1 className="text-3xl mt-10 mb-5">Questions</h1>

          {global.quiz.map((question, index) => {
            return (
              <div className="mb-6 p-4 question" key={`question -${index}`}>
                <h2 className="text-xl font-semibold">
                  {index + 1} - {decodeURIComponent(question.question)}
                </h2>
                {question.type === 'boolean' && (
                  <div onChange={getAnswer}>
                    <div className="space-x-2">
                      <input
                        type="radio"
                        name={index + 1}
                        id={`True${index + 1}`}
                        value={'True'}
                        data-position={index}
                        className="inputAnswer"
                      />
                      <label htmlFor={`True${index + 1}`} className="text-lg">
                        True
                      </label>
                    </div>

                    <div className="space-x-2">
                      <input
                        type="radio"
                        name={index + 1}
                        id={`False${index + 1}`}
                        value={'False'}
                        data-position={index}
                        className="inputAnswer"
                      />
                      <label htmlFor={`False${index + 1}`} className="text-lg">
                        False
                      </label>
                    </div>
                  </div>
                )}

                {question.type === 'multiple' && (
                  <>
                    {question.all_answers.map((answer) => {
                      return (
                        <div
                          className="space-x-2 answerContaine"
                          onChange={getAnswer}
                          key={`question-${index}`}
                        >
                          <input
                            type="radio"
                            name={index + 1}
                            id={answer}
                            value={answer}
                            data-position={index}
                            className="inputAnswer"
                          />
                          <label htmlFor={answer} className="text-lg">
                            {decodeURIComponent(answer)}
                          </label>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            );
          })}

          {finishQuiz && (
            <div className="mt-10 text-2xl flex space-x-2 bg-gray-300 w-48 px-5 py-2 uppercase rounded-md font-semibold">
              <h2>Result: </h2>
              <h3>
                {global.correctAnswers.length}/{global.allCorrectAnswers.length}
              </h3>
            </div>
          )}

          <Button
            variant="contained"
            size="large"
            sx={{ fontSize: '1.2rem', marginTop: '2rem' }}
            color="success"
            onClick={checkAnswers}
            id="bottom"
          >
            Check answers
          </Button>
        </div>
      )}
      <Link
        to="top"
        smooth={true}
        duration={500}
        className="rounded-full bg-yellow-400 inline-block p-2 fixed right-10 bottom-10 cursor-pointer animate-bounce"
      >
        <ArrowUpwardIcon />
      </Link>

      <Link
        to="bottom"
        smooth={true}
        duration={500}
        className="rounded-full bg-yellow-400 inline-block p-2 fixed right-24 bottom-10 cursor-pointer animate-bounce"
      >
        <ArrowDownwardIcon />
      </Link>
    </div>
  );
}

export default App;
