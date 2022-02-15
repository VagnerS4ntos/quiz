import _ from 'lodash';
import axios from 'axios';

export async function generateQuiz(
  setGettingData,
  setFinishQuiz,
  setError,
  setAllCorrectAnswers,
  setChosenAnswers,
  setQuiz,
  numberOfQuestion,
  selectedCategory,
  difficulty,
  type,
) {
  setGettingData(false);
  setFinishQuiz(false);
  setError(false);
  try {
    setGettingData(true);
    setAllCorrectAnswers([]);
    setChosenAnswers([]);
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${selectedCategory}&difficulty=${difficulty}&type=${type}&encode=url3986`,
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

    setQuiz(allQuestions);

    //Get all correct answers
    _.forEach(results, (item) => {
      setAllCorrectAnswers((correctAnswer) => [
        ...correctAnswer,
        item.correct_answer,
      ]);
    });

    setGettingData(false);
  } catch (error) {
    console.log(error.message);
    setGettingData(false);
    setError(true);
  }
}

//
//
//Save de selected answers in a array
export function getAnswer(target, chosenAnswers, setChosenAnswers) {
  let allAnswers = '';
  if (chosenAnswers.length > 0) {
    allAnswers = chosenAnswers;

    allAnswers.forEach((item) => {
      if (item.index.toString() === target.dataset.position.toString()) {
        item.answer = target.value;
      } else {
        allAnswers = [{ index: target.dataset.position, answer: target.value }];
      }
    });
  }

  if (allAnswers.length === 0) {
    setChosenAnswers((chosenAnswer) =>
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
    setChosenAnswers((chosenAnswer) =>
      _.uniqWith(
        _.sortBy([...chosenAnswer, ...allAnswers], (answer) => {
          return answer.index;
        }),
        _.isEqual,
      ),
    );
  }
}

//
//
//Compare the selected answers with all correct answers
export function checkAnswers(
  chosenAnswers,
  allCorrectAnswers,
  getCorrectAnswers,
  finishQuiz,
) {
  const correctAnswers = [];
  chosenAnswers.forEach((chosenAnswer) => {
    allCorrectAnswers.forEach((correctAnswer) => {
      if (chosenAnswer.answer === correctAnswer) {
        correctAnswers.push(chosenAnswer);
      }
    });
  });
  getCorrectAnswers(correctAnswers);

  //Paint question container
  const allQuestionsContainer = document.querySelectorAll('.question');
  allQuestionsContainer.forEach(
    (container) => (container.style.border = '4px solid #f00'),
  );
  chosenAnswers.forEach((chosen, index) => {
    if (chosen.answer === allCorrectAnswers[chosen.index]) {
      allQuestionsContainer[chosen.index].style.border = '4px solid #0f0';
    }
  });

  //Disable input answers
  const allInputAnswers = document.querySelectorAll('.inputAnswer');
  allInputAnswers.forEach((item) => {
    item.setAttribute('disabled', true);
  });

  finishQuiz(true);
}
