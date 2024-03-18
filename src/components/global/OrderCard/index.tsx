"use client";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "../../ui/separator";
import OrderCustomer from "./components/OrderCustomer";
import { OrderContext } from "@/context/OrderContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IBike } from "@/types/Bike";
import { getBike } from "@/services/InventoryService";
import OrderBike from "./components/OrderBike";

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
					<>{bikeDisplay && <OrderBike bike={bikeDisplay} />}</>
				)}
			</div>
		</div>
	);
};

export default OrderCard;
