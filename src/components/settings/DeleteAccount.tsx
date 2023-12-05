'use client';
import { useUsers } from '@/globalStates/config';
import { adminAuthClient } from '@/supabase/admin';
import React, { MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

function DeleteAccount() {
	const router = useRouter();
	const [deleteAcc, setDeleteAcc] = React.useState(false);
	const { user } = useUsers((state) => state);
	const [customError, setCustomError] = React.useState('');

	const handleClose: MouseEventHandler<HTMLElement> = (event) => {
		const target = event.target as HTMLElement;
		if (target.dataset.close) {
			setDeleteAcc(false);
		}
	};

	async function deleteAccount() {
		const { error } = await adminAuthClient.deleteUser(user.id);

		if (error) {
			setCustomError(error.message);
			return;
		}
		toast.success('Sua conta foi deletada com sucesso');
		router.refresh();
	}

	return (
		<section className="max-w-sm mx-auto mt-5" onClick={handleClose}>
			<button
				className="p-2 w-full rounded-md mt-3 bg-orange-500 hover:bg-orange-600"
				onClick={() => setDeleteAcc(true)}
			>
				Deletar conta
			</button>

			{deleteAcc && (
				<div
					className="bg-white bg-opacity-50 fixed inset-0 grid place-items-center"
					data-close={true}
				>
					<div className="bg-white p-4 rounded-md">
						<BsFillExclamationTriangleFill
							className="text-red-600 mx-auto mb-2"
							size="2em"
						/>
						<h2 className="text-black text-lg">
							Tem certeza que quer deletar sua conta?
						</h2>
						<button
							className="p-2 w-full rounded-md mt-3 bg-red-600 hover:bg-red-700"
							onClick={deleteAccount}
						>
							Deletar
						</button>
						<span className="text-red-500 text-sm">{customError}</span>
						<button
							className="p-2 w-full rounded-md mt-3 bg-green-500 hover:bg-green-600"
							data-close={true}
						>
							Cancelar
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

export default DeleteAccount;
