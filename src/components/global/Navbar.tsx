"use client";
import Link from "next/link";
import { LogOut, Bell } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
	const { data: session } = useSession();
	const userInfo = session?.user;

	const menu = [
		{
			href: "/dashboard",
			label: "แผงควบคุม",
		},
		{
			href: "/employees",
			label: "พนักงาน",
			admin: true,
		},
		{
			href: "/reports",
			label: "รายงาน",
			admin: true,
		},
		{
			href: "/inventory",
			label: "สินค้า",
		},
		{
			href: "/customers",
			label: "ลูกค้า",
		},
		{
			href: "/storage",
			label: "สถานที่จัดเก็บ",
			admin: true,
		},
		{
			href: "/sales",
			label: "ขาย",
		},
	];

	return (
		<nav className="w-full bg-slate-800 flex items-center justify-between text-zinc-300 h-24  p-2">
			<div className="flex items-center">
				<Link
					href="/dashboard"
					className="prompt pl-10 text-3xl font-extrabold cursor-pointer "
				>
					คาราเมโล POS
				</Link>
			</div>
			<span className="flex justify-center items-center text-sm text-white font-extrabold">
				Logged in as {userInfo?.username}
			</span>
			<div className="flex justify-evenly flex-row space-x-3 items-center text-gray-200">
				{menu.map((item) => (
					<>
						{item.admin ? (
							<>
								{userInfo?.role === "adm" && (
									<Link
										href={item.href}
										className="cursor-pointer p-3 rounded hover:bg-slate-600"
									>
										{item.label}
									</Link>
								)}
							</>
						) : (
							<>
								<Link
									href={item.href}
									className="cursor-pointer p-3 rounded hover:bg-slate-600"
								>
									{item.label}
								</Link>
							</>
						)}
					</>
				))}

				{/* <Bell className="cursor-pointer" opacity={0.6} size={"1.2rem"} /> */}
				<LogOut
					onClick={() => signOut()}
					className="ml-10 cursor-pointer"
					opacity={0.6}
					size={"1.2rem"}
				/>
			</div>
		</nav>
	);
};
