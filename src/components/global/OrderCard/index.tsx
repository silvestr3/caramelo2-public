"use client";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "../../ui/separator";
import OrderCustomer from "./components/OrderCustomer";
import { OrderContext } from "@/context/OrderContext";
import Link from "next/link";
import { Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IBike } from "@/types/Bike";
import { getBike } from "@/services/InventoryService";
import OrderBike from "./components/OrderBike";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AdditionalFeeDialog from "./components/AdditionalFeeDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderFee from "./components/OrderFee";

const OrderCard = () => {
	const {
		orderBike,
		orderCustomer,
		orderAdditionalFees,
		totalPrice,
		discount,
		down_payment,
		payment_method,
		notes,
		setDiscount,
		setDown_payment,
		setPayment_method,
		resetOrder,
	} = useContext(OrderContext);

	const [bikeDisplay, setBikeDisplay] = useState<IBike | null>(orderBike);

	const fetchData = async () => {
		if (orderBike) {
			const bike = await getBike(orderBike.id);
			setBikeDisplay(bike);
		}
	};

	useEffect(() => {
		fetchData();
	}, [orderBike, totalPrice]);

	return (
		<div className="text-center m-10 p-10 border border-transparent shadow-md h-[81vh] bg-slate-800 font-extrabold text-slate-50 rounded-xl">
			<h2 className="text-xl prompt">สรุปรายการขาย</h2>
			<Separator className="my-5 opacity-40" />

			<div className="min-h-[80%]">
				<div className="min-h-16">
					<OrderCustomer />
				</div>

				{orderBike === null ? (
					<>
						<p className="text-center mt-3">ยังไม่มีคำสั่งซื้อ</p>
						<Link
							href={"/inventory"}
							className="flex hover:scale-105 cursor-pointer justify-center items-center mt-3"
						>
							<Button variant={"ghost"} className="p-2 bg-slate-600 dark">
								<ShoppingCart opacity={"60%"} />
							</Button>
						</Link>
					</>
				) : (
					<>
						{bikeDisplay && <OrderBike bike={bikeDisplay} />}
						<div className="flex items-center justify-start gap-3 mt-3 p-3">
							<span>ค่าธรรมเนียมอื่นๆ</span>
							<AdditionalFeeDialog>
								<Button className="bg-slate-700 hover:rounded hover:scale-105 cursor-pointer rounded-lg p-1 size-6 flex items-center justify-center">
									<Plus className="text-slate-50" />
								</Button>
							</AdditionalFeeDialog>
						</div>
						<div className="min-h-44 max-h-44 overflow-y-auto">
							{orderAdditionalFees.map((fee) => (
								<OrderFee fee={fee} />
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default OrderCard;
