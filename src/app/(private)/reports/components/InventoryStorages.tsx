"use client";
import {
	getInventoryBrandsReport,
	getInventoryStoragesReport,
} from "@/services/ReportsService";
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
			const { data } = await getInventoryStoragesReport();
			setReportData(data);
		};

		getData();
	}, []);

	return (
		<div className="flex flex-col col-span-1 items-center justify-center">
			<ResponsiveContainer width={200} height={200}>
				<PieChart>
					<Pie nameKey={"storage_name"} data={reportData} dataKey={"total"}>
						{reportData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={generateRandomDarkColor()} />
						))}
						<LabelList dataKey={"storage_name"} />
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
			<h2>Brands units per storage place</h2>
		</div>
	);
};

export default InventoryBrands;
