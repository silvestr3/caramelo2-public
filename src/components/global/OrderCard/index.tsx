import React from "react";
import { Separator } from "../../ui/separator";
import OrderCustomer from "./components/OrderCustomer";

const OrderCard = () => {
	return (
		<div className="text-center m-10 p-10 border border-transparent shadow-md h-[81vh] bg-slate-800 font-extrabold text-slate-50 rounded-xl">
			<h2 className="text-xl prompt">สรุปรายการขาย</h2>
			<Separator className="my-5 opacity-40" />

			<div className="min-h-[80%]">
				<OrderCustomer />
			</div>
		</div>
	);
};

export default OrderCard;
