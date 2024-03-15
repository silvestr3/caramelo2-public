"use client";

import { DataTable } from "@/components/ui/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IOrder } from "@/types/Order";
import { useEffect, useState } from "react";
import { OrderColumns } from "../components/OrderColumns";
import { SelectCustomer } from "@/components/global/SelectCustomer";
import { DateRangePicker } from "@/components/global/DateRangePicker";
import { DateRange } from "react-day-picker";
import { getFilteredOrders } from "@/services/OrderService";

interface OrdersViewProps {
	orders: IOrder[];
}

const OrdersView = ({ orders }: OrdersViewProps) => {
	const [ordersDisplay, setOrdersDisplay] = useState<IOrder[]>(orders);
	const [customerFilter, setCustomerFilter] = useState<string>("");
	const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
		undefined
	);

	const handleGetFilteredOrders = async () => {
		const params = {
			customer_id: customerFilter !== "" ? parseInt(customerFilter) : undefined,
			startDate: dateFilter?.from,
			endDate: dateFilter?.to,
		};

		const filteredOrders = await getFilteredOrders({ ...params });
		setOrdersDisplay(filteredOrders);
	};

	useEffect(() => {
		handleGetFilteredOrders();
	}, [customerFilter, dateFilter]);

	return (
		<>
			<div className="grid grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold prompt">ประวัติการขาย</h2>
					<h6 className="prompt">รวมทั้งหมด: {ordersDisplay.length}</h6>
				</div>

				<div className="flex justify-end gap-2">
					<SelectCustomer value={customerFilter} setValue={setCustomerFilter} />
					<DateRangePicker date={dateFilter} setDate={setDateFilter} />
				</div>
			</div>

			<ScrollArea className="mt-3">
				<DataTable data={ordersDisplay} columns={OrderColumns} />
			</ScrollArea>
		</>
	);
};

export default OrdersView;
