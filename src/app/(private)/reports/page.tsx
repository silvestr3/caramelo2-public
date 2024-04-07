import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesReports from "./views/SalesReports";
import InventoryReport from "./views/InventoryReport";
import CustomersReports from "./views/CustomersReports";

const Reports = () => {
	return (
		<>
			<h2 className="text-3xl font-semibold prompt">รายงาน</h2>

			<Tabs defaultValue="sales" className="w-full">
				<TabsList>
					<TabsTrigger value="sales">ขาย</TabsTrigger>
					<TabsTrigger value="inventory">สินค้า</TabsTrigger>
					<TabsTrigger value="customers">ลูกค้า</TabsTrigger>
				</TabsList>
				<TabsContent value="sales">
					<SalesReports />
				</TabsContent>
				<TabsContent value="inventory">
					<InventoryReport />
				</TabsContent>
				<TabsContent value="customers">
					<CustomersReports />
				</TabsContent>
			</Tabs>
		</>
	);
};

export default Reports;
