import React from 'react';
import { Button } from '@mui/material';
import { GlobalContext } from '../GlobalStorage';
import ReactLoading from 'react-loading';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-scroll';

import { checkAnswers, getAnswer, generateQuiz } from '../helpers/functions';
import Error from './Error';

function Content() {
  const global = React.useContext(GlobalContext);
  const [gettingData, setGettingData] = React.useState(false);
  const [finishQuiz, setFinishQuiz] = React.useState(false);
  const [error, setError] = React.useState(false);

  function generateQuizClick() {
    generateQuiz(
      setGettingData,
      setFinishQuiz,
      setError,
      global.setAllCorrectAnswers,
      global.setChosenAnswers,
      global.setQuiz,
      global.numberOfQuestion,
      global.selectedCategory,
      global.difficulty,
      global.type,
    );
  }

  function checkAnswersClick() {
    checkAnswers(
      global.chosenAnswers,
      global.allCorrectAnswers,
      global.setCorrectAnswers,
      setFinishQuiz,
    );
  }

  function getAnswerClick({ target }) {
    getAnswer(target, global.chosenAnswers, global.setChosenAnswers);
  }

  if (error) return <Error />;

  return (
    <main className="container mx-auto py-10" id="top">
      <Button
        variant="contained"
        size="large"
        sx={{ fontSize: '1.2rem', marginTop: '2rem' }}
        onClick={generateQuizClick}
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
                  <div onChange={getAnswerClick}>
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
                          onChange={getAnswerClick}
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
            <div className="mt-10 text-2xl flex space-x-2 bg-gray-500 w-48 px-5 py-2 uppercase rounded-md font-semibold">
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
            onClick={checkAnswersClick}
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
    </main>
  );
}

export default Content;
