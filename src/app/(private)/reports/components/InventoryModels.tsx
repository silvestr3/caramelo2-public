"use client";
import { getInventoryModelsReport } from "@/services/ReportsService";
import React, { useEffect, useState } from "react";
import {
	ResponsiveContainer,
	LabelList,
	BarChart,
	Bar,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
	Rectangle,
} from "recharts";

const InventoryModels = () => {
	const [reportData, setReportData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await getInventoryModelsReport();
			console.log(data);
			setReportData(data);
		};

		getData();
	}, []);

	return (
		<div className={"col-span-3 flex flex-col items-center justify-start"}>
			<h2>Model units on inventory</h2>
			<ResponsiveContainer width={"100%"} height={500}>
				<BarChart
					data={reportData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis
						tick={{ fontSize: 8, height: 500 }}
						dataKey="model_name"
						angle={-45}
						textAnchor="end"
						interval={0}
					/>
					<YAxis dataKey="total" />
					<Tooltip />
					<Bar dataKey="total" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default InventoryModels;
