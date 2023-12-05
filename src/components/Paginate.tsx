import React from 'react';
import ReactPaginate from 'react-paginate';

function Paginate({
	totalUsers,
	usersPerPege,
	setCurrentPage,
}: {
	totalUsers: number;
	usersPerPege: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
	const pageCount = Math.ceil(totalUsers / usersPerPege);
	const changePage = ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	return (
		<ReactPaginate
			previousLabel={'<'}
			nextLabel={'>'}
			pageCount={pageCount}
			onPageChange={changePage}
			containerClassName="paginationContainer"
			activeClassName="paginationActive"
			nextLinkClassName="link"
			marginPagesDisplayed={1}
		/>
	);
}

export default Paginate;
