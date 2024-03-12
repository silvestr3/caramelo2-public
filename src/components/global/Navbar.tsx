import Link from "next/link";
import { LogOut, Bell } from "lucide-react";
// import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
	// const { data: session } = useSession();
	// const userInfo = session?.user;

	return (
		<nav className="w-full bg-slate-800 text-zinc-300 h-24 grid grid-cols-3 p-2">
			<div className="flex items-center">
				<Link
					href="/"
					className="prompt pl-10 text-3xl font-extrabold cursor-pointer "
				>
					คาราเมโล POS
				</Link>
			</div>
			<span className="flex justify-center items-center text-sm text-white font-extrabold">
				Logged in as jaiko
			</span>
			<div className="flex justify-center flex-row space-x-3 items-center text-gray-200">
				<Link
					href={"/dashboard"}
					className="cursor-pointer p-3 rounded hover:bg-slate-600"
				>
					แผงควบคุม
				</Link>
				<Link
					href={"/employees"}
					className="cursor-pointer p-3 rounded hover:bg-slate-600"
				>
					พนักงาน
				</Link>
				<Link
					href={"/inventory"}
					className="cursor-pointer p-3 rounded hover:bg-slate-600"
				>
					สินค้า
				</Link>
				<Link
					href={"/customers"}
					className="cursor-pointer p-3 rounded hover:bg-slate-600"
				>
					ลูกค้า
				</Link>
				<Link
					href={"/storage"}
					className="cursor-pointer p-3 rounded hover:bg-slate-600"
				>
					สถานที่จัดเก็บ
				</Link>
				<Link
					href={"/sales"}
					className="cursor-pointer p-3 rounded hover:bg-slate-600"
				>
					ขาย
				</Link>
				<Bell className="cursor-pointer" opacity={0.6} size={20} />
				<LogOut className="ml-10 cursor-pointer" opacity={0.6} size={20} />
			</div>
		</nav>
	);
};
