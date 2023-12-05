import { User } from '@supabase/supabase-js';
import { z } from 'zod';

/*************************CATEGORIES********************************/
const APIcategoriesSchema = z.object({
	id: z.number(),
	name: z.string(),
});
export type APIcategoriesT = z.infer<typeof APIcategoriesSchema>;

const categoryDataSchema = z.object({
	user_id: z.string(),
	user_name: z.string(),
	total_corrects: z.number(),
	total_incorrects: z.number(),
	total: z.number(),
});
export type categoryDataT = z.infer<typeof categoryDataSchema>;

/*************************FILTERS********************************/
const storeFiltersSchema = z.object({
	amount: z.number(),
	setQuestionAmount: z.function().args(z.number()),
	allCategories: z.array(APIcategoriesSchema),
	getAllCategories: z.function().args(z.array(APIcategoriesSchema)),
	category: z.string(),
	setCategory: z.function().args(z.string()),
	difficulty: z.string(),
	setDifficulty: z.function().args(z.string()),
	type: z.string(),
	setType: z.function().args(z.string()),
	resetFilters: z.function(),
	showFilters: z.boolean(),
	setShowFilters: z.function(),
});
export type storeFiltersT = z.infer<typeof storeFiltersSchema>;

/*************************USER ANSWERS********************************/
const userAnswerSchema = z.object({
	answer: z.string(),
	id: z.string(),
	correct: z.boolean(),
	correct_answer: z.string(),
	category: z.string(),
});
export type userAnswerT = z.infer<typeof userAnswerSchema>;

/*************************QUIZ********************************/
const quizDataSchema = z.object({
	all_answers: z.array(z.string()),
	category: z.string(),
	correct_answer: z.string(),
	difficulty: z.string(),
	id: z.string(),
	incorrect_answers: z.array(z.string()),
	question: z.string(),
	type: z.string(),
});
export type quizDataT = z.infer<typeof quizDataSchema>;

/*************************ZUSTAND HANDLE QUIZ DATA********************************/
const storeQuizSchema = z.object({
	quizData: z.array(quizDataSchema),
	getQuizData: z.function().args(z.array(quizDataSchema)),

	userAnswers: z.array(userAnswerSchema),
	getUserAnswers: z.function().args(z.array(userAnswerSchema)),

	finishedQuiz: z.boolean(),
	setFinishedQuiz: z.function().args(z.boolean()),

	resetQuizData: z.function(),
});
export type storeQuizT = z.infer<typeof storeQuizSchema>;

/*************************USER********************************/

export interface storeUserI {
	user: User;
	getUser: (data: User) => void;
	usersNames: string[];
	getUsersNames: (data: string[]) => void;
}

/*************************RANKING********************************/
export type rankingDataI = {
	all_categories: { category: string; corrects: number; incorrects: number }[];
} & categoryDataT;

export interface storeRankingI {
	allRankingData: rankingDataI[];
	getAllRankingData: (data: rankingDataI[]) => void;
	userRankingData: rankingDataI[];
	getUserRankingData: (data: rankingDataI[]) => void;
}
