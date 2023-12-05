'use client';
import React from 'react';
import { useFilters } from '@/globalStates/config';
import { getAllQuizCategories } from '@/helpers/functions';

function Categories() {
	const { allCategories, getAllCategories, category, setCategory } = useFilters(
		(state) => state,
	);

	React.useEffect(() => {
		//Evita o fetch desnecessário quando o filtro é ocultado e depois mostrado
		if (!allCategories.length) {
			getAllQuizCategories().then((data) => getAllCategories(data));
		}
	}, []);

	return (
		<div>
			<label className="block mb-1">Categoria</label>
			<select
				className="text-black px-2 py-1 rounded-md w-full"
				value={category}
				onChange={({ target }) => setCategory(target.value)}
			>
				<option value="" disabled>
					Any category
				</option>
				{allCategories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default Categories;
