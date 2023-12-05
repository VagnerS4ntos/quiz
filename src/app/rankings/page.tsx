'use client';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useRanking, useFilters } from '@/globalStates/config';
import GlobalRanking from '@/components/ranking/GlobalRanking';
import UserRanking from '@/components/ranking/UserRanking';
import { getAllQuizCategories, getRankingData } from '@/helpers/functions';

function Rankings() {
	const { getAllRankingData } = useRanking((state) => state);
	const { getAllCategories } = useFilters((state) => state);

	React.useEffect(() => {
		getRankingData().then((data) => getAllRankingData(data));
		getAllQuizCategories().then((categories) => getAllCategories(categories));
	}, []);

	return (
		<main className="container my-2">
			<Tabs
				defaultFocus={true}
				forceRenderTabPanel={true}
				className="w-fit mx-auto"
			>
				<TabList className={'uppercase text-center border-b'}>
					<Tab>Ranking Global</Tab>
					<Tab>Ranking Pessoal</Tab>
				</TabList>

				<TabPanel>
					<GlobalRanking />
				</TabPanel>
				<TabPanel>
					<UserRanking />
				</TabPanel>
			</Tabs>
		</main>
	);
}

export default Rankings;
