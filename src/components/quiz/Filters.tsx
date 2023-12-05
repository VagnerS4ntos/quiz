import React from 'react';
import Categories from '@/components/quiz/Categories';
import Difficulty from '@/components/quiz/Difficulty';
import Type from '@/components/quiz/Type';
import Amount from '@/components/quiz/Amount';

function Filters() {
	return (
		<>
			<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-5 max-w-sm sm:max-w-3xl">
				<Amount />
				<Categories />
				<Difficulty />
				<Type />
			</section>
		</>
	);
}

export default Filters;
