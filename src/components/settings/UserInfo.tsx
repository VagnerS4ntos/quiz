import React from 'react';
import { formateDate } from '@/helpers/functions';
import { User } from '@supabase/supabase-js';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

function UserInfo({ user }: { user: User }) {
	return (
		<div className="max-w-sm mx-auto">
			<ul className="flex flex-col">
				<li className="rounded-full overflow-hidden w-fit mb-2"></li>
				<li className="rounded-full overflow-hidden w-fit mb-2">
					{user.user_metadata.avatar_url ? (
						<Image
							src={user.user_metadata.avatar_url}
							alt="Foto de perfil"
							width={50}
							height={50}
						/>
					) : (
						<FaUserCircle size="3.2em" />
					)}
				</li>
				<li className="flex items-center">
					<span className="font-bold mr-2">Nome:</span>
					<span>{user.user_metadata.name}</span>
				</li>

				<li className="flex items-center">
					<span className="font-bold mr-2">Email:</span>
					<span>{user.email}</span>
				</li>
				<li className="flex items-center">
					<span className="font-bold mr-2">Último login:</span>
					<span>{formateDate(user.last_sign_in_at!)}</span>
				</li>
				<li className="flex items-center">
					<span className="font-bold mr-2">Criação da conta:</span>
					<span>{formateDate(user.created_at)}</span>
				</li>
			</ul>
		</div>
	);
}

export default UserInfo;
