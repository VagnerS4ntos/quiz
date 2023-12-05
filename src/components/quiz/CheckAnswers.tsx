import React from 'react';
import { useRanking, useUsers, useQuiz } from '@/globalStates/config';
import {
	checkAnswers,
	getDataSchemaToUpdateDatabase,
	getUserRankingData,
	updateDatabase,
} from '@/helpers/functions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function CheckAnswers() {
	const { quizData, userAnswers, setFinishedQuiz, finishedQuiz } = useQuiz(
		(state) => state,
	);
	const { getAllRankingData, allRankingData } = useRanking((state) => state);
	const { user } = useUsers((state) => state);
	const router = useRouter();

	async function finishQuiz() {
		try {
			if (!user) {
				router.push('/login');
				return;
			}
			let userRankingData = await getUserRankingData(user);

			getAllRankingData(allRankingData);
			checkAnswers(userAnswers, quizData);

			const { userDataChecked } = await getDataSchemaToUpdateDatabase(
				userRankingData,
				userAnswers,
				user,
			);
			await updateDatabase(userDataChecked, user);

			setFinishedQuiz(true);
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado');
		}
	}

	return (
		<button
			className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 px-2 py-1 rounded-md"
			id="bottom"
			onClick={finishQuiz}
			disabled={finishedQuiz}
		>
			Finalizar
		</button>
	);
}

export default CheckAnswers;
