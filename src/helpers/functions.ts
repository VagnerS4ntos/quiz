import { userAnswerT, rankingDataI, quizDataT } from '@/typescript/interfaces';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase/config';
import axios from 'axios';

export function shuffleArray(array: string[]) {
	return array.sort(() => Math.random() - 0.5);
}

//O 1º forEach percorre cada ul, que são as respostas (componente Quiz)
//O 2º forEach percorre as respostas do usuário
export function getQuizResult(
	answersContainer: any,
	userAnswers: userAnswerT[],
) {
	answersContainer.current.forEach((container: any) => {
		userAnswers.forEach((answer) => {
			if (container && container.dataset.id == answer.id) {
				Array.from(container.children).map((li: any) => {
					if (
						li.innerText === decodeURIComponent(answer.answer) &&
						answer.correct
					) {
						li.classList.add('userCorrectAnswer');
					} else if (
						li.innerText === decodeURIComponent(answer.answer) &&
						!answer.correct
					) {
						li.classList.add('incorrect');
					} else if (
						!answer.correct &&
						li.innerText === decodeURIComponent(answer.correct_answer)
					) {
						li.classList.add('correct');
					}
				});
			}
		});
	});
}

//Pega todas as categorias da API
export async function getAllQuizCategories() {
	const url = 'https://opentdb.com/api_category.php';
	const { data } = await axios.get(url);
	const categories = data.trivia_categories.sort((a: any, b: any) => {
		return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
	});
	return categories;
}

//Pega os dados de todos os usuários do banco de dados
export async function getRankingData() {
	const { data: quiz } = await supabase.from('quiz').select('*');
	return quiz as rankingDataI[];
}

//Pega os dados do banco de dados apenas do usuário logado
export async function getUserRankingData(user: User) {
	const { data } = await supabase
		.from('quiz')
		.select('*')
		.eq('user_id', user.id);
	return data as rankingDataI[];
}

//Verifica as respostas marcadas e altera array que armazena as respostas
export function checkAnswers(
	userAnswers: userAnswerT[],
	quizData: quizDataT[],
) {
	userAnswers.map((answer) => {
		quizData.forEach((quiz) => {
			if (answer.id == quiz.id && answer.answer == quiz.correct_answer) {
				answer.correct = true;
			} else if (answer.id == quiz.id && answer.answer != quiz.correct_answer) {
				answer.correct_answer = quiz.correct_answer;
			}
		});
	});
}

//Verifica se uma categoria respondida possui dados no banco de dados
function checkIfCategoryExistsOnDatabase(
	answers: userAnswerT[],
	initialUserData: rankingDataI,
) {
	answers.forEach((answer) => {
		if (
			!initialUserData.all_categories ||
			!initialUserData.all_categories.some((item) => {
				return item.category == answer.category;
			})
		) {
			const newCategoryData = {
				category: answer.category,
				corrects: 0,
				incorrects: 0,
			};
			if (!initialUserData.all_categories) {
				initialUserData.all_categories = [newCategoryData];
			} else {
				initialUserData.all_categories.push(newCategoryData);
			}
		}
	});
	return initialUserData;
}

//Cria um esquema de padrão com o resultado do quiz para atualizar o banco de dados
export async function getDataSchemaToUpdateDatabase(
	rankingData: rankingDataI[],
	answers: userAnswerT[],
	user: User,
) {
	const userData = rankingData.filter(
		(ranking) => ranking.user_id == user.id,
	)[0];

	const total_corrects = answers.filter((answer) => answer.correct).length;
	const total_incorrects = answers.filter((answer) => !answer.correct).length;

	userData.total_corrects += total_corrects;
	userData.total_incorrects += total_incorrects;
	userData.total = userData.total_corrects + userData.total_incorrects;

	const userDataChecked = checkIfCategoryExistsOnDatabase(answers, userData);

	answers.forEach((answer) => {
		userDataChecked.all_categories.map((item) => {
			if (item.category == decodeURIComponent(answer.category)) {
				if (answer.correct) {
					item.corrects += 1;
				} else {
					item.incorrects += 1;
				}
			}
		});
	});

	return { userDataChecked };
}

//Atualiza do banco de dados
export async function updateDatabase(userData: rankingDataI, user: User) {
	await supabase
		.from('quiz')
		.update({
			all_categories: userData.all_categories,
			total_corrects: userData.total_corrects,
			total_incorrects: userData.total_incorrects,
			total: userData.total,
		})
		.eq('user_id', user.id)
		.select();
}

//Pega os dados para renderizar na página Ranking
export function getAllDatabaseByCategory(
	category: string,
	allData: rankingDataI[],
) {
	const fiteredData =
		category == 'all'
			? allData
			: allData.map((data) => {
					if (!data.all_categories) {
						return data;
					} else {
						const filteredCategory = data.all_categories.filter(
							(item) => item.category == category,
						)[0];

						return {
							user_id: data.user_id,
							user_name: data.user_name,
							total_corrects: filteredCategory?.corrects || 0,
							total_incorrects: filteredCategory?.incorrects || 0,
							total:
								filteredCategory?.corrects + filteredCategory?.incorrects || 0,
						};
					}
			  });

	return fiteredData;
}

//Formata data para o padrão brasileiro
export function formateDate(date: string) {
	const dateUTC = new Date(date);

	const formatedDate =
		dateUTC.toLocaleDateString('pt-BR') +
		' - ' +
		dateUTC.toLocaleTimeString('pt-BR');

	return formatedDate;
}
