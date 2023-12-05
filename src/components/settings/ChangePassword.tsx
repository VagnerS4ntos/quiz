import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/supabase/config';
import { toast } from 'react-toastify';

const schema = z
	.object({
		password: z
			.string()
			.min(6, { message: 'A senha precisa ter pelo menos 6 caracteres' }),
		password2: z.string(),
	})
	.refine((data) => data.password == data.password2, {
		path: ['password2'],
		message: 'As senhas precisam ser iguais',
	});

type FormProps = z.infer<typeof schema>;

function ChangePassword() {
	const [customError, setCustomError] = React.useState('');
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<FormProps>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormProps> = async ({ password }) => {
		const { error } = await supabase.auth.updateUser({ password });

		if (error) {
			setCustomError(error.message);
			return;
		}
		toast.success('Senha alterada com sucesso!');
		resetField('password');
		resetField('password2');
	};

	return (
		<section className="max-w-sm mx-auto mt-5">
			<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<input
					type="password"
					placeholder="Senha"
					className="mt-1 p-2 w-full rounded-md text-black"
					{...register('password')}
				/>
				<span className="text-red-500 text-sm mb-2">
					{errors.password?.message}
				</span>
				<input
					type="password"
					placeholder="Repita a senha"
					className="mt-1 p-2 w-full rounded-md text-black"
					{...register('password2')}
				/>
				<span className="text-red-500 text-sm">
					{errors.password2?.message}
				</span>
				<button className="p-2 w-full rounded-md mt-3 bg-blue-500  hover:bg-blue-600">
					Atualizar
				</button>
				<span className="text-red-500 text-sm">{customError}</span>
			</form>
		</section>
	);
}

export default ChangePassword;
