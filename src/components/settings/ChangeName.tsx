import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/supabase/config';
import { toast } from 'react-toastify';
import { useUsers } from '@/globalStates/config';
import { useRouter } from 'next/navigation';

const schema = z.object({
	name: z
		.string()
		.min(3, { message: 'Seu nome precisa ter pelo menos 3 caracteres' }),
});

type FormProps = z.infer<typeof schema>;

function ChangeName() {
	const { user, usersNames } = useUsers((state) => state);
	const [customError, setCustomError] = React.useState('');
	const router = useRouter();

	const {
		register,
		handleSubmit,
		resetField,
		setError,
		formState: { errors },
	} = useForm<FormProps>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormProps> = async ({ name }) => {
		if (name.trim() == user.user_metadata.name) {
			setError('name', {
				type: 'custom',
				message: 'Você deve escolher um nome diferente do atual',
			});
			return;
		}

		if (usersNames.includes(name.toLowerCase().trim())) {
			setError('name', {
				type: 'custom',
				message: 'Este nome já está em uso. Escolha outro',
			});
			return;
		}

		const { error } = await supabase.auth.updateUser({
			data: { name: name.trim() },
		});

		if (error) {
			setCustomError(error.message);
			return;
		}

		router.refresh();
		toast.success('Nome atualizado com sucesso!');
		resetField('name');
	};

	return (
		<section className="max-w-sm mx-auto mt-5">
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Nome"
					className="mt-1 p-2 w-full rounded-md text-black"
					{...register('name')}
				/>
				<span className="text-red-500 text-sm">{errors.name?.message}</span>
				<button className="p-2 w-full rounded-md mt-3 bg-blue-500  hover:bg-blue-600">
					Atualizar
				</button>
				<span className="text-red-500 text-sm">{customError}</span>
			</form>
		</section>
	);
}

export default ChangeName;
