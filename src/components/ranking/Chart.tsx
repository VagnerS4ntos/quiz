import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { defaults } from 'chart.js';
import { categoryDataT, rankingDataI } from '@/typescript/interfaces';

ChartJS.register(...registerables);

function ChartRanking({
	chartData,
	category,
}: {
	chartData: categoryDataT | rankingDataI;
	category: string;
}) {
	const data = {
		labels: ['Acertos', 'Erros'],
		datasets: [
			{
				data: [
					chartData?.total_corrects || 0,
					chartData?.total_incorrects || 0,
				],
				backgroundColor: ['rgb(22 163 74)', 'rgb(255 50 50)'],
				hoverOffset: 4,
			},
		],
	};

	defaults.font.size = 20;
	const options = {};

	if (!category) return <></>;

	return (
		<section>
			{!chartData?.total_corrects && !chartData?.total_incorrects ? (
				<h2 className="mt-2">Você ainda não respondeu nessa categoria</h2>
			) : (
				<Pie data={data} options={options} />
			)}
		</section>
	);
}

export default ChartRanking;
