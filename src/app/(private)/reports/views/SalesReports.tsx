"use client";

import SalePayments from "../components/SalePayments";
import SaleTrends from "../components/SaleTrends";

const SalesReports = () => {
	return (
		<div className="flex flex-col justify-evenly items-start gap-5 h-full">
			<SaleTrends />

			<div className="flex items-center flex-col justify-end">
				<SalePayments />
			</div>
		</div>
	);
};

export default SalesReports;
