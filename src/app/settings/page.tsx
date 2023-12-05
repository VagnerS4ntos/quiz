'use client';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ChangeName from '@/components/settings/ChangeName';
import ChangeEmail from '@/components/settings/ChangeEmail';
import ChangePassword from '@/components/settings/ChangePassword';
import DeleteAccount from '@/components/settings/DeleteAccount';
import UserInfo from '@/components/settings/UserInfo';
import { useUsers } from '@/globalStates/config';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Settings() {
	const { user } = useUsers((state) => state);

	return (
		<main className="container my-2">
			<Tabs
				defaultFocus={true}
				forceRenderTabPanel={true}
				className="w-fit mx-auto"
			>
				<TabList className="uppercase text-center border-b">
					<Tab>Alterar nome</Tab>
					<Tab>Alterar email</Tab>
					<Tab>Alterar senha</Tab>
					<Tab>Deletar conta</Tab>
				</TabList>

				<TabPanel>
					<ChangeName />
				</TabPanel>
				<TabPanel>
					<ChangeEmail />
				</TabPanel>
				<TabPanel>
					<ChangePassword />
				</TabPanel>
				<TabPanel>
					<DeleteAccount />
				</TabPanel>
			</Tabs>
			<section className="mt-10">
				{user.user_metadata ? (
					<UserInfo user={user} />
				) : (
					<AiOutlineLoading3Quarters
						className="animate-spin mx-auto"
						size="3em"
					/>
				)}
			</section>
		</main>
	);
}

export default Settings;
