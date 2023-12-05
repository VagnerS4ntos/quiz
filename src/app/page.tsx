'use client';
import React from 'react';
import Filters from '@/components/quiz/Filters';
import GenerateQuiz from '@/components/quiz/GenerateQuiz';
import Quiz from '@/components/quiz/Quiz';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useFilters } from '@/globalStates/config';

export default function Home() {
	const [loading, setLoading] = React.useState(false);
	const { setShowFilters, showFilters } = useFilters((state) => state);

	return (
		<>
			<main className="container my-2">
				{showFilters ? (
					<p
						className="flex items-center gap-2 text-lg mb-2 cursor-pointer"
						onClick={() => setShowFilters()}
					>
						<FaRegEyeSlash /> <span>Ocultar filtros</span>
					</p>
				) : (
					<p
						className="flex items-center gap-2 text-lg mb-2 cursor-pointer"
						onClick={() => setShowFilters()}
					>
						<FaRegEye /> <span>Mostrar filtros</span>
					</p>
				)}

				{showFilters && <Filters />}

				<GenerateQuiz setLoading={setLoading} />
				{loading ? (
					<AiOutlineLoading3Quarters
						className="animate-spin mx-auto mt-4"
						size="3em"
					/>
				) : (
					<Quiz />
				)}
			</main>
		</>
	);
}
