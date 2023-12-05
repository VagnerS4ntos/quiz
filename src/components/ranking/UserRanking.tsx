import { useRanking, useUsers, useFilters } from '@/globalStates/config';
import React from 'react';
import Chart from './Chart';
import { getAllDatabaseByCategory } from '@/helpers/functions';
import { categoryDataT, rankingDataI } from '@/typescript/interfaces';

function UserRanking() {
	const { allRankingData } = useRanking((state) => state);
	const { user } = useUsers((state) => state);
	const { allCategories } = useFilters((state) => state);
	const [category, setCategory] = React.useState('');
	const [filteredData, setFilteredData] = React.useState<
		rankingDataI[] | categoryDataT[]
	>([]);

	const userData = allRankingData.filter((item) => item.user_id == user.id);

	React.useEffect(() => {
		const categoryData = getAllDatabaseByCategory(category, userData);
		setFilteredData(categoryData);
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
			<Chart chartData={filteredData[0]} category={category} />
		</section>
	);
}

export default UserRanking;
