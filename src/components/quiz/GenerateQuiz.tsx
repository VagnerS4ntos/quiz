'use client';
import React from 'react';
import { useFilters, useQuiz } from '@/globalStates/config';
import { shuffleArray } from '@/helpers/functions';
import { quizDataT } from '@/typescript/interfaces';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';

function GenerateQuiz({
	setLoading,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const { amount, category, difficulty, type } = useFilters((state) => state);
	const { getQuizData, setFinishedQuiz, getUserAnswers } = useQuiz(
		(state) => state,
	);
	//Controle de fetch. Só deixa um novo fecth ser feito após 5 segundos do fetch anterior
	const [canGenerateQuiz, setCanGenerateQuiz] = React.useState(true);
	const toast_id = 'custom-toast';

	async function generateQuiz() {
		if (!canGenerateQuiz) {
			toast.info(`Aguarde um momento...`, { toastId: toast_id });
			return;
		}
		setCanGenerateQuiz(false);
		toast.dismiss(toast_id);
		setLoading(true);
		try {
			const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`;
			const {
				data: { results },
			} = await axios.get(url);
			results.map((item: quizDataT) => {
				(item.all_answers = shuffleArray([
					item.correct_answer,
					...item.incorrect_answers,
				])),
					(item.id = uuidv4());
			});
			const answersContainerData = results.map((item: quizDataT) => {
				return {
					answer: null,
					id: item.id,
					correct: false,
					category: item.category,
					correct_answer: item.correct_answer,
				};
			});
			getUserAnswers(answersContainerData);
			getQuizData(results);
			setFinishedQuiz(false);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setTimeout(() => {
				setCanGenerateQuiz(true);
			}, 5000);
		}
	}

	return (
		<div className="mt-4">
			<button
				className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-2 py-1 rounded-md uppercase font-bold"
				onClick={generateQuiz}
			>
				Gerar quiz
			</button>
		</div>
	);
}

export default GenerateQuiz;
