'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import { VscSignOut } from 'react-icons/vsc';
import { IoMdSettings } from 'react-icons/io';
import { FaRankingStar } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useUsers, useFilters, useQuiz } from '@/globalStates/config';
import { supabase } from '@/supabase/config';
import { User } from '@supabase/supabase-js';
import { adminAuthClient } from '@/supabase/admin';

function Header({ user }: { user: string }) {
	const router = useRouter();
	const { resetQuizData } = useQuiz((state) => state);
	const { resetFilters } = useFilters((state) => state);
	const { getUser, getUsersNames } = useUsers((state) => state);

	React.useEffect(() => {
		getUser(JSON.parse(user));

		adminAuthClient.listUsers().then(({ data }) => {
			const usersNames = data.users.map((user) =>
				user.user_metadata.name.toLowerCase(),
			);
			getUsersNames(usersNames);
		});
	}, [user]);

	async function logOut() {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			resetQuizData();
			resetFilters();
			router.refresh();
			router.push('/login');
		}
	}

	supabase.auth.onAuthStateChange((event, session) => {
		if (event == 'USER_UPDATED') getUser(session?.user as User);
	});

	return (
		<header className="bg-gradient-to-r from-green-200 to-green-600 flex fixed top-0 w-full">
			<nav className="container py-2 flex justify-between items-center">
				<Link href="/">
					<p className="flex flex-col items-center text-black">
						<Image src={logo} alt="Logo" width={65} height={65} />
						<span className="font-semibold text-center min-w-max block">
							{JSON.parse(user).user_metadata.name}
						</span>
					</p>
				</Link>

				<ul className="text-black flex items-center gap-3">
					<li title="Ranking">
						<Link href="/rankings">
							<FaRankingStar size="1.8em" className="hover:text-white" />
						</Link>
					</li>

					<li title="Configurações">
						<Link href="/settings">
							<IoMdSettings size="1.8em" className="hover:text-white" />
						</Link>
					</li>

					<li
						className="cursor-pointer flex flex-col justify-center items-center"
						title="Sair"
						onClick={logOut}
					>
						<VscSignOut size="1.8em" className="hover:text-red-500" />
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
