'use client';
import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/supabase/config';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const schema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
});

type FormProps = z.infer<typeof schema>;

function ResetPassword() {
	const [error, setError] = React.useState('');

	//O supabase só permite uma requisição a cada 60 segundos
	//O state abaixo é para controlar esse tempo
	const [canRequest, setCanRequest] = React.useState(true);

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<FormProps>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormProps> = async ({ email }) => {
		const toast_id_request = 'toast_request';
		if (!canRequest) {
			toast.info(
				`Por segurança, você só pode fazer uma requisição a cada 60 segundos`,
				{ toastId: toast_id_request },
			);
			setError('Por favor, aguarde');
			return;
		}
		setError('');
		setCanRequest(false);
		toast.dismiss(toast_id_request);

		const toast_id = 'custom-toast';
		toast.success(
			<div className="flex items-center gap-2">
				<AiOutlineLoading3Quarters className="animate-spin" />
				<span>Por favor, aguarde</span>
			</div>,
			{ autoClose: false, toastId: toast_id },
		);
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/updatePassword`,
		});
		toast.dismiss(toast_id);

		if (error) {
			setError(error.message);
			return;
		}
		toast.success('Enviamos e-mail. Por favor, verifique sua caixa de entrada');
		resetField('email');
		setTimeout(() => {
			setCanRequest(true);
		}, 60000);
	};

	return (
		<main className="flex flex-col justify-center items-center h-screen px-4">
			<section className="bg-white text-black p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-semibold mb-4">Resetar senha</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="mb-2">
					<div className="mb-4">
						<label htmlFor="email" className="block font-medium">
							E-mail
						</label>
						<input
							type="text"
							id="email"
							className="mt-1 p-2 w-full border border-gray-400 rounded-md"
							{...register('email')}
						/>
						<span className="text-red-500 text-sm">
							{errors.email?.message}
						</span>
					</div>

					<>
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md active:bg-blue-400"
						>
							Enviar
						</button>
						<span className="text-red-500 text-sm">{error}</span>
					</>
				</form>

				<Link href="/login" className="text-blue-600 hover:text-blue-800">
					Login
				</Link>
			</section>
		</main>
	);
}

export default ResetPassword;
