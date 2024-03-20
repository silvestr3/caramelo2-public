"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserGreeting = () => {
	const { data: session } = useSession();
	const userInfo = session?.user;

	return (
		<div className="mb-3">
			<h2 className="text-3xl font-semibold">ยินดีต้อนรับ, {userInfo?.name}</h2>
		</div>
	);
};

export default UserGreeting;
