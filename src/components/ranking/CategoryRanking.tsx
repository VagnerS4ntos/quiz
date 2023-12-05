import { useRanking, useFilters, useUsers } from '@/globalStates/config';
import React from 'react';

interface categoryDataI {
	user_id: string;
	user_name: string;
	total_corrects: number;
	total_incorrects: number;
}

function CategoryRanking() {
	const { allCategories } = useFilters((state) => state);
	const { allRankingData } = useRanking((state) => state);
	const { user } = useUsers((state) => state);
	const [category, setCategory] = React.useState('');
	const [filteredData, setFilteredData] = React.useState<categoryDataI[]>([]);

	React.useEffect(() => {
		const data =
			category == 'all'
				? allRankingData
				: allRankingData.map((data) => {
						const filteredCategory = data.all_categories.filter(
							(item) => item.category == category,
						)[0];

						return {
							user_id: data.user_id,
							user_name: data.user_name,
							total_corrects: filteredCategory?.corrects,
							total_incorrects: filteredCategory?.incorrects,
						};
				  });

		setFilteredData(data);
	}, [category]);

	return (
		<section className="grid place-items-center mt-5">
			<div className="text-center">
				<label className="text-2xl mb-2 block uppercase">
					Selecione uma categoria
				</label>
				<select
					className="text-black px-2 py-1 rounded-md w-fit"
					value={category}
					onChange={({ target }) => setCategory(target.value)}
				>
					<option value="" disabled>
						Selecione
					</option>
					<option value="all">All categories</option>
					{allCategories.map((category) => (
						<option key={category.id} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			{filteredData.length > 0 && category && (
				<table className="border w-full lg:w-2/3 text-center mt-4">
					<thead className="uppercase border">
						<tr className="bg-zinc-600">
							<th>#</th>
							<th>Nome</th>
							<th>Respostas corretas</th>
							<th>Respostas incorretas</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map(
							(
								{ user_id, user_name, total_corrects, total_incorrects },
								index,
							) => (
								<tr
									key={user_id}
									className={`${
										user_id == user.id && 'bg-gray-100 text-black'
									}`}
								>
									<td>{index + 1}</td>
									<td>{user_name}</td>
									<td className="text-center">{total_corrects}</td>
									<td className="text-center">{total_incorrects}</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			)}
		</section>
	);
}

export default CategoryRanking;
