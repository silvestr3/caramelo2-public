import { Separator } from "@/components/ui/separator";
import React from "react";
import LatestSales from "./components/LatestSales";
import { getLatestOrders } from "@/services/OrderService";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserGreeting from "./components/UserGreeting";
import MenuItems from "./components/MenuItems";
import { Label } from "@/components/ui/label";

const Dashboard = async () => {
	const latestOrders = await getLatestOrders().then((res) => res?.json());

	return (
		<div className="flex flex-col justify-between h-full">
			<UserGreeting />
			<MenuItems />

			<Separator className="my-5" />

			<ScrollArea className="h-auto">
				<Label>Latest orders</Label>
				<LatestSales sales={latestOrders} />
			</ScrollArea>
		</div>
	);
};

export default Dashboard;
