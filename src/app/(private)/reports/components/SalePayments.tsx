"use client";
import { getSalesPaymentMethodsReport } from "@/services/ReportsService";
import React, { useEffect, useState } from "react";
import {
	PieChart,
	Pie,
	Sector,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
	LabelList,
} from "recharts";
import { generateRandomDarkColor } from "../util";

const SalePayments = () => {
	const [reportData, setReportData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await getSalesPaymentMethodsReport();
			setReportData(data);
		};

		getData();
	}, []);

	return (
		<div>
			<h2>Payment method usage</h2>
			<ResponsiveContainer width={350} height={350}>
				<PieChart>
					<Pie
						nameKey={"payment_method"}
						data={reportData}
						dataKey={"total_sales"}
					>
						{reportData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={generateRandomDarkColor()} />
						))}
						<LabelList dataKey={"payment_method"} />
					</Pie>
					<Tooltip />
					<Legend layout="vertical" verticalAlign="middle" align="right" />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SalePayments;
