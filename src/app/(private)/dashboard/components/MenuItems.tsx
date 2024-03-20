"use client";
import {
	ShoppingCart,
	UsersRound,
	Receipt,
	Warehouse,
	Contact,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";

const buttonStyle =
	"group shadow border border-double rounded-lg flex justify-center items-center h-[150px] w-full cursor-pointer hover:border-transparent ";

const menuPages = [
	{
		href: "/inventory",
		style: buttonStyle + "bg-emerald-100 hover:bg-emerald-200",
		icon: <ShoppingCart opacity={0.6} size={"2rem"} />,
		label: "สินค้า",
	},
	{
		href: "/customers",
		style: buttonStyle + "bg-teal-100 hover:bg-teal-200",
		icon: <UsersRound opacity={0.6} size={"2rem"} />,
		label: "ลูกค้า",
	},
	{
		href: "/sales",
		style: buttonStyle + "bg-orange-100 hover:bg-orange-200",
		icon: <Receipt opacity={0.6} size={"2rem"} />,
		label: "ขาย",
	},
	{
		href: "/storage",
		style: buttonStyle + "bg-rose-100 hover:bg-rose-200",
		icon: <Warehouse opacity={0.6} size={"2rem"} />,
		label: "สถานที่จัดเก็บ",
		admin: true,
	},
	{
		href: "/employees",
		style: buttonStyle + "bg-sky-100 hover:bg-sky-200",
		icon: <Contact opacity={0.6} size={"2rem"} />,
		label: "พนักงาน",
		admin: true,
	},
];

const MenuItems = () => {
	const { data: session } = useSession();
	const userInfo = session?.user;

	return (
		<div className="grid grid-cols-3 mt-5 gap-5">
			{menuPages.map((button) => (
				<>
					{button.admin ? (
						<>
							{userInfo?.role === "adm" && (
								<Link className={button.style} href={button.href}>
									<div className="flex gap-5 items-center">
										{button.icon}
										{button.label}
									</div>
								</Link>
							)}
						</>
					) : (
						<>
							<Link className={button.style} href={button.href}>
								<div className="flex gap-5 items-center">
									{button.icon}
									{button.label}
								</div>
							</Link>
						</>
					)}
				</>
			))}
		</div>
	);
};

export default MenuItems;
