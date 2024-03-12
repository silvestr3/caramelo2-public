import React from "react";

import { Navbar } from "@/components/global/Navbar";
import { Prompt } from "next/font/google";
import OrderCard from "@/components/global/OrderCard";
import OrderProvider from "@/context/OrderContext";
const prompt = Prompt({ weight: "100", subsets: ["latin", "thai"] });

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<OrderProvider>
				<main className={`bg-slate-200 text-slate-900 ${prompt.className}`}>
					<Navbar />
					<main className="grid grid-cols-[3fr_1fr] gap-0 mt-0 h-full">
						<section className="m-10 bg-slate-50 font-bold p-10 h-[80vh] rounded-xl pt-5">
							{children}
						</section>
						<aside>
							<OrderCard />
						</aside>
					</main>
				</main>
			</OrderProvider>
		</>
	);
}
