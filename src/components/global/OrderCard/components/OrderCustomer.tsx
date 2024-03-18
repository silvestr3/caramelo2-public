"use client";
import { OrderContext } from "@/context/OrderContext";
import { getCustomers } from "@/services/CustomerService";
import { getCustomerOrders } from "@/services/OrderService";
import { ICustomer } from "@/types/Customer";
import { IOrder } from "@/types/Order";
import { ChevronDown, ChevronUp, Search, User, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const OrderCustomer = () => {
	const { orderCustomer, addCustomerToOrder, removeCustomerFromOrder } =
		useContext(OrderContext);

	const [customerOrders, setCustomerOrders] = useState<IOrder[]>([]);
	const [customerName, setCustomerName] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [customersList, setCustomersList] = useState<ICustomer[]>([]);

	const fetchCustomers = async () => {
		const customers = await getCustomers();
		setCustomersList(customers);
	};

	const toggleOpenSelect = () => {
		setIsOpen((state) => !state);
	};

	const fetchCustomerOrders = async (id: number) => {
		const customerOrders = await getCustomerOrders(id);
		setCustomerOrders(customerOrders);
	};

	const handleSelectCustomer = (customer: ICustomer) => {
		addCustomerToOrder(customer);
		setIsOpen(false);
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

	useEffect(() => {
		if (orderCustomer) fetchCustomerOrders(orderCustomer?.id);
	}, [orderCustomer]);

	return (
		<div className="bg-slate-600 text-white my-2 p-3 flex flex-col items-start rounded-lg shadow-sm relative group">
			{orderCustomer ? (
				<>
					<div className="flex items-center gap-3">
						<User opacity={"60%"} />
						<div className="flex flex-col items-start">
							<h3 className="font-extrabold text-sm">{orderCustomer.name}</h3>
							<span className="text-xs">
								{customerOrders.length === 0
									? "New customer (first order)"
									: `Returning customer (${customerOrders.length} order${
											customerOrders.length > 1 ? "s" : ""
									  })`}
							</span>
						</div>
					</div>

					<div
						onClick={removeCustomerFromOrder}
						className="bg-slate-200 hover:rounded-sm scale-75 hover:cursor-pointer hidden absolute right-3 group-hover:flex justify-center items-center p-2 rounded"
					>
						<X size={14} className="text-slate-900 " />
					</div>
				</>
			) : (
				<>
					<div
						onClick={toggleOpenSelect}
						className="hover:cursor-pointer flex w-full justify-between"
					>
						<div className="flex items-center h-full gap-2">
							<User opacity={"60%"} />
							<h3 className="font-extrabold text-sm ">เลือกลูกค้า</h3>
						</div>
						<div>{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
					</div>
					<ul
						className={`${
							isOpen ? "flex flex-col" : "hidden"
						}  absolute shadow-sm w-full -translate-x-3 translate-y-10 rounded bg-slate-200 text-slate-900 max-h-40 overflow-y-auto text-start`}
					>
						<div className="grid grid-cols-12 sticky top-0 bg-slate-200 p-0">
							<div className="p-2 col-span-1 grid items-center">
								<Search opacity={0.5} size={16} />
							</div>
							<input
								type="text"
								placeholder="ค้นหาลูกค้า"
								value={customerName}
								onChange={(e) => setCustomerName(e.target.value.toLowerCase())}
								className={`p-2 col-span-10 placeholder:text-sm text-sm focus:ring-0 ring-0 w-full border-none bg-slate-200`}
							/>
						</div>
						{customersList.map((customer, index) => (
							<li
								value={customer.id}
								key={index}
								onClick={() => handleSelectCustomer(customer)}
								className={`p-2 text-sm text-slate-900 hover:bg-slate-300 ${
									customer.name.toLowerCase().startsWith(customerName)
										? "block"
										: "hidden"
								}`}
							>
								{customer.name}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default OrderCustomer;
