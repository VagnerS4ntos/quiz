import { useUsers } from '@/globalStates/config';
import { categoryDataT } from '@/typescript/interfaces';
import React from 'react';
import { BsArrowDownShort } from 'react-icons/bs';

import { MagicMotion } from 'react-magic-motion';

function GlobalRankingTable({
	currentUsers,
	category,
	orderBy,
	orderData,
}: {
	currentUsers: categoryDataT[];
	category: string;
	orderBy: (event: any) => void;
	orderData: string;
}) {
	const { user } = useUsers((state) => state);

	return (
		<>
			{currentUsers.length > 0 && category && (
				<table className="mt-5 border table-auto">
					<thead>
						<tr className="bg-gray-200 text-black uppercase text-sm">
							<th className={`px-4 py-2`}>#</th>
							<th className={`px-4 py-2 text-left `}>
								<span
									className="flex items-center gap-1 cursor-pointer"
									onClick={orderBy}
									data-order="user_name"
								>
									Nome
									{orderData == 'user_name' && (
										<BsArrowDownShort
											size="1.5em"
											className={`${orderData != 'user_name' && 'invisible'}`}
										/>
									)}
								</span>
							</th>
							<th className={`px-4 py-2 text-center `}>
								<span
									className="flex items-center gap-1 cursor-pointer"
									onClick={orderBy}
									data-order="total_corrects"
								>
									Corretas
									{orderData == 'total_corrects' && (
										<BsArrowDownShort
											size="1.5em"
											className={`${
												orderData != 'total_corrects' && 'invisible'
											}`}
										/>
									)}
								</span>
							</th>
							<th className={`px-4 py-2 text-center cursor-pointer `}>
								<p
									className="flex items-center gap-1 cursor-pointer"
									onClick={orderBy}
									data-order="total_incorrects"
								>
									Incorretas
									{orderData == 'total_incorrects' && (
										<BsArrowDownShort
											size="1.5em"
											className={`${
												orderData != 'total_incorrects' && 'invisible'
											}`}
										/>
									)}
								</p>
							</th>
							<th className={`px-4 py-2 text-center cursor-pointer`}>
								<span
									className="flex items-center gap-1"
									onClick={orderBy}
									data-order="total"
								>
									Total
									{orderData == 'total' && (
										<BsArrowDownShort
											size="1.5em"
											className={`${orderData != 'total' && 'invisible'}`}
										/>
									)}
								</span>
							</th>
						</tr>
					</thead>
					<MagicMotion>
						<tbody className="text-white">
							{currentUsers.map(
								(
									{
										user_id,
										user_name,
										total_corrects,
										total_incorrects,
										total,
									},
									index,
								) => (
									<tr
										key={user_id}
										className={`${
											user_id == user.id && 'bg-green-700 text-white font-bold'
										} border-b`}
									>
										<td className={`px-4 py-2 text-center`}>{index + 1}</td>
										<td className={`px-4 py-2 text-left`}>{user_name}</td>
										<td className={`px-4 py-2 text-center`}>
											{total_corrects || 0}
										</td>
										<td className={`px-4 py-2 text-center`}>
											{total_incorrects || 0}
										</td>
										<td className={`px-4 py-2 text-center`}>{total}</td>
									</tr>
								),
							)}
						</tbody>
					</MagicMotion>
				</table>
			)}
		</>
	);
}

export default GlobalRankingTable;
