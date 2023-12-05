'use client';
import { supabase } from '@/supabase/config';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function GoogleLogin() {
	const router = useRouter();
	const [requesting, setRequesting] = React.useState(false);
	const [error, setError] = React.useState('');

	async function login() {
		router.refresh();
		setRequesting(true);

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth`,
			},
		});

		if (error) {
			setError(error.message);
			setRequesting(false);
		}
	}

	return (
		<>
			<button
				className="flex items-center justify-center bg-black hover:bg-zinc-800 text-white p-2 rounded-md mt-4 w-full gap-2 active:bg-zinc-700 h-10"
				title="Entre con sua conta Google"
				onClick={() => login()}
				disabled={requesting}
			>
				{requesting ? (
					<AiOutlineLoading3Quarters className="animate-spin" />
				) : (
					<>
						<FcGoogle size="1.5em" />
						<p>Entre com o Goolge</p>
					</>
				)}
			</button>
			<span className="text-red-500 text-sm">{error}</span>
		</>
	);
}

export default GoogleLogin;
