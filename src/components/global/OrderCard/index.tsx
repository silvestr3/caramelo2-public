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
import AdditionalFeeDialog from "./components/AdditionalFeeDialog";
import OrderFee from "./components/OrderFee";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { IOrder } from "@/types/Order";
import { createOrder } from "@/services/OrderService";
import { useRouter } from "next/navigation";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const OrderCard = () => {
	const {
		orderBike,
		bikePrice,
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

	const router = useRouter();

	const handleOrderCheckout = async () => {
		if (!orderCustomer) {
			toast.info("Select customer before checkout");
			return;
		}
		if (bikePrice === 0) {
			toast.info("Set product price before checkout");
			return;
		}

		const payload = {
			customer: orderCustomer.id,
			bikes: [orderBike],
			additional_fees: orderAdditionalFees.map((fee) => fee),
			discount,
			down_payment,
			payment_method,
			notes,
			total: totalPrice,
		} as IOrder;

		const checkout = await createOrder(payload);
		if (checkout.status === "success") {
			toast.success("Order placed successfully!");
			const data = await checkout.data;
			resetOrder();
			router.push(`/sales/${data.data}/receipt`);
		} else {
			const error = await checkout.data;
			Object.keys(error).map((key) => {
				toast.error(`${key}: ${error[key][0]}`);
			});
		}
	};

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
								<OrderFee key={fee.id} fee={fee} />
							))}
						</div>

						<div className="flex flex-col">
							<div className="mt-1 flex justify-between items-center p-1">
								<label htmlFor="discount">ส่วนลด</label>
								<Input
									type="number"
									id="discount"
									value={discount}
									onChange={(e) => setDiscount(parseFloat(e.target.value))}
									className="bg-slate-700 my-0 focus:ring-0 border-none max-w-[50%] rounded-lg"
								/>
							</div>

							<div className="mt-1 flex justify-between items-center p-1">
								<label htmlFor="downpayment">เงินดาวน์</label>
								<Input
									type="number"
									id="downpayment"
									value={down_payment}
									onChange={(e) => setDown_payment(parseFloat(e.target.value))}
									className="bg-slate-700 my-0 focus:ring-0 border-none max-w-[50%] rounded-lg"
								/>
							</div>

							<div className="mt-1 flex justify-between items-center p-1">
								<label htmlFor="paymentmethod">การชำระเงิน</label>
								<Select
									value={payment_method}
									defaultValue={payment_method}
									onValueChange={(e) => setPayment_method(e)}
								>
									<SelectTrigger className="bg-slate-700 my-0 focus:ring-0 border-none max-w-[50%] rounded-lg">
										{payment_method ? payment_method : "Select"}
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="เงินสด">เงินสด</SelectItem>
										<SelectItem value="ไฟแนนซ์">ไฟแนนซ์</SelectItem>
										<SelectItem value="ผ่อนกับร้าน">ผ่อนกับร้าน</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</>
				)}
			</div>
			{orderBike && (
				<div className="sticky">
					<div className="w-full border-slate-700 border-b mt-2"></div>
					<div className="flex justify-between p-2">
						<span>ราคารวม</span>
						<span>฿ {totalPrice}</span>
					</div>

					<Button
						onClick={handleOrderCheckout}
						className="bg-slate-900 hover:bg-slate-950 p-2 px-9 rounded-lg text-slate-50"
					>
						สั่งซื้อชำระเงิน
					</Button>
				</div>
			)}
		</div>
	);
};

export default OrderCard;
