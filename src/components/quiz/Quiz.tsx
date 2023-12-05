'use client';
import React from 'react';
import { useQuiz } from '@/globalStates/config';
import CheckAnswers from './CheckAnswers';
import { getQuizResult } from '@/helpers/functions';
import SmoothScroll from './SmoothScroll';

function Quiz() {
	const { quizData, getUserAnswers, userAnswers, finishedQuiz } = useQuiz(
		(state) => state,
	);

	function getAnswer({ target }: any) {
		const id = target.closest('[data-id]')!.dataset.id;
		const copyUserAnswers = [...userAnswers];

		copyUserAnswers.map((userAnswer) => {
			if (userAnswer.id == id) {
				userAnswer.answer = target.value;
			}
		});

		getUserAnswers(copyUserAnswers);
	}

	const answersContainer = React.useRef(
		Array(quizData?.length).fill(React.createRef()),
	);

	React.useEffect(() => {
		if (finishedQuiz) {
			getQuizResult(answersContainer, userAnswers);
		}
	}, [finishedQuiz, quizData]);

	return (
		<section className="my-4">
			{finishedQuiz && (
				<div className="mb-4 grid grid-cols-1 sm:grid-cols-3 border p-2">
					<p className="flex items-center gap-2">
						<span className="w-5 h-5 block bg-custom-green" />
						Você acertou
					</p>
					<p className="flex items-center gap-2">
						<span className="w-5 h-5 block bg-custom-red" />
						Você errou
					</p>
					<p className="flex items-center gap-2">
						<span className="w-5 h-5 block bg-custom-aqua" />
						Resposta correta
					</p>
				</div>
			)}

			{quizData.map((quiz, index) => (
				<div key={quiz.id} className="mb-6">
					<p className="font-bold">
						{index + 1} - {decodeURIComponent(quiz.question)}
					</p>
					<ul
						ref={(el) => (answersContainer.current[index] = el)}
						data-id={quiz.id}
						data-category={quiz.category}
					>
						{quiz.all_answers.map((answer, i) => (
							<li key={answer}>
								<input
									type="radio"
									name={quiz.question}
									id={quiz.question + i}
									className="mr-2"
									onChange={getAnswer}
									value={answer}
									data-position={index}
									disabled={finishedQuiz}
								/>
								<label htmlFor={quiz.question + i}>
									{decodeURIComponent(answer)}
								</label>
							</li>
						))}
					</ul>
				</div>
			))}

			{quizData.length > 0 && <CheckAnswers />}

			<SmoothScroll />
		</section>
	);
}

export default Quiz;
