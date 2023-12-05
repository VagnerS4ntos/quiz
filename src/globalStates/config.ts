import { create } from 'zustand';
import {
	storeRankingI,
	storeFiltersT,
	storeQuizT,
	storeUserI,
} from '@/typescript/interfaces';
import { User } from '@supabase/supabase-js';

/**********HANDLE FILTERS**********/
export const useFilters = create<storeFiltersT>((set) => ({
	amount: 5,
	setQuestionAmount: (data) => set(() => ({ amount: data })),
	allCategories: [],
	getAllCategories: (data) => set(() => ({ allCategories: data })),
	category: '',
	setCategory: (data) => set(() => ({ category: data })),
	difficulty: '',
	setDifficulty: (data) => set(() => ({ difficulty: data })),
	type: '',
	setType: (data) => set(() => ({ type: data })),
	resetFilters: () =>
		set(() => ({
			amount: 5,
			allCategories: [],
			category: '',
			difficulty: '',
			type: '',
		})),

	showFilters: false,
	setShowFilters: () => set((state) => ({ showFilters: !state.showFilters })),
}));

/**********HANDLE QUIZ**********/
export const useQuiz = create<storeQuizT>((set) => ({
	quizData: [],
	getQuizData: (data) => set(() => ({ quizData: data })),
	userAnswers: [],
	getUserAnswers: (data) => set(() => ({ userAnswers: data })),
	finishedQuiz: false,
	setFinishedQuiz: (data: boolean) => set(() => ({ finishedQuiz: data })),

	resetQuizData: () =>
		set(() => ({ quizData: [], userAnswers: [], finishedQuiz: false })),
}));

/**********HANDLE DATABSE**********/
export const useUsers = create<storeUserI>((set) => ({
	user: {} as User,
	getUser: (data) => set(() => ({ user: data })),
	usersNames: [],
	getUsersNames: (data) => set(() => ({ usersNames: data })),
}));

export const useRanking = create<storeRankingI>((set) => ({
	allRankingData: [],
	getAllRankingData: (data) => set(() => ({ allRankingData: data })),
	userRankingData: [],
	getUserRankingData: (data) => set(() => ({ allRankingData: data })),
}));
