import {
	Page,
	Text,
	View,
	Document,
	Image,
	Font,
	StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { IBike } from "@/types/Bike";
import { IStorage } from "@/types/Storage";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { getDate } from "@/util/GetDateString";

interface HistoryItem {
	id: number;
	transfer_date: Date | string;
	bikes: IBike[];
	origin: IStorage;
	destination: IStorage;
}

interface TransferReceiptTemplateProps {
	item: HistoryItem;
}

const TransferReceiptTemplate = ({ item }: TransferReceiptTemplateProps) => {
	Font.register({
		family: "Prompt",
		format: "truetype",
		src: "/fonts/Prompt-Regular.ttf",
	});

	//@ts-expect-error
	const dateString = getDate(item.transfer_date);

	const styles = StyleSheet.create({
		general: {
			fontFamily: "Prompt",
		},
		image: {
			padding: 0,
			margin: 0,
		},
		table: {
			display: "flex",
			justifyContent: "space-around",
			flexDirection: "row",
		},
	});

	const tw = createTw({});

	const tdStyle = tw(
		"text-xs flex justify-center prompt items-center w-[75%] p-1"
	);
	let total = 0;
	item.bikes?.map((bike) => {
		total += parseFloat(bike.sale_price);
	});

	return (
		<Document style={tw("flex flex-row items-center")}>
			<Page style={styles.general} size={"A5"} orientation="landscape">
				<View style={tw("flex flex-row pt-5 px-5 justify-between w-[95%]")}>
					<View style={tw("w-32 p-0 m-0 h-32")}>
						<Image style={styles.image} src={"/logo.png"} />
					</View>
					<View style={tw("flex items-center")}>
						<Text style={tw("text-sm")}>นพดลมอเตอร์กรุ้ป</Text>
						<Text style={tw("text-sm")}>
							359/2 หมู่ 6 ตําบลร้องเข็ม อําเภอร้องกวาง จังหวัดแพร่ โทร.
							099-376-8889
						</Text>
						<Text style={tw("text-sm")}>ศูนย์รวมรถจักรยานยนต์</Text>
						<Text style={tw("text-sm mt-3 font-extrabold underline")}>
							ใบส่งมอบสินค้า
						</Text>
					</View>
					<View style={tw("flex items-center")}>
						<Text style={tw("text-sm")}>ใบโอนรถ</Text>
						<Text style={tw("text-sm")}>
							{`${item.destination?.id}`.padStart(4, "0")}/
							{`${item.id}`.padStart(2, "0")}
						</Text>
					</View>
				</View>

				<View style={tw("flex items-center justify-center -translate-y-12")}>
					<View style={tw("flex items-end w-[89%] justify-end")}>
						<Text style={tw("text-sm")}>{dateString}</Text>
					</View>
					<View style={tw("border w-[89%] p-2")}>
						<Text style={tw("text-xs my-2")}>
							นาม {item.destination?.storage_name}
						</Text>
						<Text style={tw("text-xs my-2")}>
							ทีอยู่ {item.destination?.address}
						</Text>
						<Text style={tw("text-xs my-2")}>
							โทรศัพท์ {item.destination?.phone}
						</Text>
					</View>

					<Table style={tw("w-[91%] p-2 mt-2")}>
						<TH>
							<TD style={tdStyle}>ลําดับ</TD>
							<TD style={tdStyle}>รหัสรุ่น</TD>
							<TD style={tdStyle}>เลขตัวเครือง</TD>
							<TD style={tdStyle}>เลขตัวถัง</TD>
							<TD style={tdStyle}>สี</TD>
							<TD style={tdStyle}>สจํานวนเงิน</TD>
						</TH>
						{item.bikes?.map((bike, index) => (
							<TR key={index}>
								<TD style={tdStyle}>{bike.id}</TD>
								<TD style={tdStyle}>{bike.model_code}</TD>
								<TD style={tdStyle}>{bike.engine}</TD>
								<TD style={tdStyle}>{bike.chassi}</TD>
								<TD style={tdStyle}>{bike.color}</TD>
								<TD style={tdStyle}>{bike.sale_price}</TD>
							</TR>
						))}
					</Table>

					<View style={tw("w-[60%] p-2 flex flex-row gap-10")}>
						<View style={tw("flex gap-3")}>
							<Text style={tw("text-sm")}>
								ลงชือ ......................................... ผู้รับสินค้า
							</Text>
							<Text style={tw("text-sm")}>
								ลงชือ ......................................... ผู้ส่งสินค้า
							</Text>
						</View>

						<View style={tw("flex gap-3")}>
							<Text style={tw("text-sm")}>
								ลงชือ ......................................... ผู้ขาย/ออกบิล
							</Text>
							<Text style={tw("text-sm")}>
								ลงชือ ......................................... ผู้อนุมัติขาย
							</Text>
						</View>
					</View>

					<View style={tw("w-[95%] text-center")}>
						<Text style={tw("text-xs")}>
							ได้รับสินค้าเรียบร้อยครบถ้วน
							และได้ลงนามในใบรับสินค้านีไว้ให้เปนหลักฐานสําคัญ
							หากเกิดการสูญหายหรือเสียหาย ทางห้างฯ จะไม่รับผิดชอบ
							ไม่ว่ากรณีใดทังสิน
						</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default TransferReceiptTemplate;
