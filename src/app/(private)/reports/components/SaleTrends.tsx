import { getSalesVolumeReport } from "@/services/ReportsService";
import React, { useEffect, useState } from "react";
import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Area,
	LineChart,
} from "recharts";
import {
	fillMissingMonths,
	generateRandomDarkColor,
	groupByYear,
} from "../util";

const SaleTrends = () => {
	const [reportData, setReportData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await getSalesVolumeReport();

			const filledData = fillMissingMonths(data);

			//@ts-expect-error
			setReportData(filledData);
		};

		getData();
	}, []);

	const groupedData = groupByYear(reportData);
	const plotData = Object.values(reportData).flatMap((yearData) => yearData);

	return (
		<div className="flex flex-col items-center justify-center h-full w-full">
			<h2>Monthly revenue trends</h2>
			<ResponsiveContainer width={"100%"} height={250}>
				<ComposedChart
					data={plotData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis
						dataKey="month"
						allowDuplicatedCategory={false}
						type="category"
					/>
					<YAxis dataKey="total_revenue" tick={{ fontSize: 14, width: 250 }} />
					<Tooltip />
					<Legend />

					{Object.keys(groupedData).map((year, index) => (
						<Line
							key={index}
							type="bump"
							//@ts-expect-error
							data={groupedData[year]}
							dataKey="total_revenue"
							name={`${year}`}
							stroke={generateRandomDarkColor()} // Random color for each line
						/>
					))}
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};

export default SaleTrends;
