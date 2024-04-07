"use client";
import { getInventoryBrandsReport } from "@/services/ReportsService";
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

const InventoryBrands = () => {
	const [reportData, setReportData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await getInventoryBrandsReport();
			setReportData(data);
		};

		getData();
	}, []);

	return (
		<div className="flex flex-col col-span-1 items-center justify-center">
			<h2>Brands units on inventory</h2>
			<ResponsiveContainer width={300} height={300}>
				<PieChart>
					<Pie nameKey={"brand"} data={reportData} dataKey={"total"}>
						{reportData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={generateRandomDarkColor()} />
						))}
						<LabelList dataKey={"brand"} />
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default InventoryBrands;
