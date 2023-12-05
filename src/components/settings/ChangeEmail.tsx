import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUsers } from '@/globalStates/config';
import { adminAuthClient } from '@/supabase/admin';
import { useRouter } from 'next/navigation';

const schema = z.object({
	email: z.string().email({ message: 'Email inválido' }),
});

type FormProps = z.infer<typeof schema>;

function ChangeEmail() {
	const { user } = useUsers((state) => state);
	const router = useRouter();
	const [customError, setCustomError] = React.useState('');

	const {
		register,
		handleSubmit,
		resetField,
		setError,
		formState: { errors },
	} = useForm<FormProps>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormProps> = async ({ email }) => {
		if (email == user?.email) {
			setError('email', {
				type: 'custom',
				message: 'Você deve escolher um email diferente do atual',
			});
			return;
		}
		const { error } = await adminAuthClient.updateUserById(user?.id!, {
			email,
		});

		if (!error) {
			router.refresh();
			toast.success('Email atualizado com sucesso!');
			resetField('email');
		} else if (
			error.message ==
			'duplicate key value violates unique constraint "users_email_partial_key"'
		) {
			setError('email', {
				type: 'custom',
				message: 'Email já em uso',
			});
		} else {
			setCustomError(error.message);
		}
	};

	return (
		<section className="max-w-sm mx-auto mt-5">
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Email"
					className="mt-1 p-2 w-full rounded-md text-black"
					{...register('email')}
				/>
				<span className="text-red-500 text-sm">{errors.email?.message}</span>
				<button className="p-2 w-full rounded-md mt-3 bg-blue-500 hover:bg-blue-600">
					Atualizar
				</button>
				<span className="text-red-500 text-sm">{customError}</span>
			</form>
		</section>
	);
}

export default ChangeEmail;
