const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

interface MonthlyData {
	year: number;
	month: string;
	total_sales: number;
	total_revenue: number;
}

export function fillMissingMonths(data: MonthlyData[]): MonthlyData[] {
	const filledData: MonthlyData[] = [];

	// Create a map of year-month keys for efficient lookup
	const dataMap: Record<string, MonthlyData> = {};
	data.forEach((item) => {
		const key = `${item.year}-${item.month}`;
		dataMap[key] = item;
	});

	// Loop through years and months to fill missing data
	for (let year = 2023; year <= 2024; year++) {
		for (let month = 1; month <= 12; month++) {
			const key = `${year}-${months[month - 1]}`;
			const existingData = dataMap[key];
			if (existingData) {
				filledData.push(existingData);
			} else {
				filledData.push({
					year,
					month: months[month - 1],
					total_sales: 0,
					total_revenue: 0,
				});
			}
		}
	}

	return filledData;
}

export function groupByYear(
	data: MonthlyData[]
): Record<number, MonthlyData[]> {
	const groupedData: Record<number, MonthlyData[]> = {};
	data.forEach((item) => {
		if (!groupedData[item.year]) {
			groupedData[item.year] = [];
		}
		groupedData[item.year].push(item);
	});
	return groupedData;
}

export function generateRandomDarkColor() {
	// Define lower bounds for RGB components to ensure dark colors
	const minR = 50; // Minimum value for red component
	const minG = 50; // Minimum value for green component
	const minB = 50; // Minimum value for blue component

	// Generate random RGB values within the specified bounds
	const r = Math.floor(Math.random() * (256 - minR)) + minR;
	const g = Math.floor(Math.random() * (256 - minG)) + minG;
	const b = Math.floor(Math.random() * (256 - minB)) + minB;

	// Convert RGB values to hexadecimal format and return the color
	return `#${(r * 65536 + g * 256 + b).toString(16).padStart(6, "0")}`;
}

// Usage example:
const lineColor = generateRandomDarkColor();
