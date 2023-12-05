import { useRanking, useFilters } from '@/globalStates/config';
import { getAllDatabaseByCategory } from '@/helpers/functions';
import React from 'react';
import { categoryDataT } from '@/typescript/interfaces';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Paginate from '../Paginate';
import GlobalRankingTable from './GlobalRankingTable';

function GlobalRanking() {
	const { allCategories } = useFilters((state) => state);
	const { allRankingData } = useRanking((state) => state);
	const [category, setCategory] = React.useState('');
	const [filteredData, setFilteredData] = React.useState<categoryDataT[]>([]);

	const [currentPage, setCurrentPage] = React.useState(1);
	const usersPerPege = 10;
	const lastUserIndex = currentPage * usersPerPege;
	const firstuserIndex = lastUserIndex - usersPerPege;
	const [currentUsers, setCurrentUsers] = React.useState<categoryDataT[]>([]);

	const [orderData, setOrderData] = React.useState('user_name');

	React.useEffect(() => {
		const filteredData = getAllDatabaseByCategory(
			category,
			allRankingData,
		).sort((a: categoryDataT, b: categoryDataT) => {
			return a.user_name > b.user_name ? 1 : -1;
		});
		setFilteredData(filteredData);

		const slicedUsers = filteredData.slice(firstuserIndex, lastUserIndex);
		setCurrentUsers(slicedUsers);
	}, [allRankingData, category, firstuserIndex, lastUserIndex]);

	//Função para ordenar a tabela
	function orderBy(event: any) {
		const orderName = event.target.closest('[data-order]').dataset.order;

		const sortFirstParam = orderName != 'user_name' ? -1 : 1;
		const sortSecondParam = orderName != 'user_name' ? 1 : -1;
		const ordenedData = filteredData.sort((a: any, b: any) => {
			return a[orderName] > b[orderName]
				? sortFirstParam
				: a[orderName] < b[orderName]
				? sortSecondParam
				: 0;
		});

		const slicedUsers = ordenedData.slice(firstuserIndex, lastUserIndex);

		setFilteredData(ordenedData);
		setCurrentUsers(slicedUsers);
		setOrderData(orderName);
	}

	return (
		<section className="grid place-items-center mt-5">
			{allCategories.length == 0 ? (
				<AiOutlineLoading3Quarters className="animate-spin" size="3em" />
			) : (
				<div className="text-center">
					<label className="text-2xl mb-2 block uppercase">
						Selecione uma categoria
					</label>
					<select
						className="text-black px-2 py-1 rounded-md w-full"
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
			)}

			<GlobalRankingTable
				currentUsers={currentUsers}
				category={category}
				orderBy={orderBy}
				orderData={orderData}
			/>

			{filteredData.length > usersPerPege && (
				<Paginate
					totalUsers={filteredData.length}
					usersPerPege={usersPerPege}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</section>
	);
}

export default GlobalRanking;
