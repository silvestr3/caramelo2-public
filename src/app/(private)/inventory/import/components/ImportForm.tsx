"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Separator } from "@/components/ui/separator";

import { importInventory } from "@/services/InventoryService";
import { getStorages } from "@/services/StorageService";
import { IBike } from "@/types/Bike";
import { IStorage } from "@/types/Storage";
import { getDate } from "@/util/GetDateString";
import { Download } from "lucide-react";
import { parse, ParseResult } from "papaparse";
import React, { ChangeEvent, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImportFormsProps {
	storages: IStorage[];
}

const ImportForm = ({ storages }: ImportFormsProps) => {
	const [bikesImport, setBikesImport] = useState<IBike[]>([]);
	const [selectedStorage, setSelectedStorage] = useState<number>(0);

	const csvHeaders = [
		[
			"Model name",
			"Model code",
			"Engine",
			"Chassis",
			"Registration plate",
			"Color",
			"Notes",
			"Category",
			"Sale price",
			"Brand",
		],
	];
	const handleFileChoose = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];

			const newBikes = [] as IBike[];

			parse(file, {
				dynamicTyping: true,
				header: true,
				complete: (results: ParseResult<Record<string, unknown>>) => {
					results.data.map((obj) => {
						const bike = {
							model_name: obj["Model name"],
							model_code: obj["Model code"],
							engine: obj["Engine"],
							chassi: obj["Chassis"],
							registration_plate: obj["Registration plate"],
							color: obj["Color"],
							notes: obj["Notes"] || "",
							category: obj["Category"] || "",
							sale_price: obj["Sale price"] || 0,
							brand: obj["Brand"],
						} as IBike;
						newBikes.push(bike);
					});

					setBikesImport(newBikes);
				},
			});
		}
	};

	const router = useRouter();

	const handleSubmitImport = () => {
		if (selectedStorage === 0) {
			toast.warning("Select storage first!");
			return;
		}

		importInventory({ storage: selectedStorage, bikes: bikesImport }).then(
			async (res) => {
				if (res.status === "success") {
					setBikesImport([]);
					setSelectedStorage(0);
					toast.success("Products imported successfully", {
						description: getDate(new Date()),
					});

					router.push("/inventory");
				} else {
					const error = await res.data;
					toast.error(error);
				}
			}
		);
	};

	const bikeProperties = [
		{
			label: "Brand",
			value: "brand",
		},
		{
			label: "Model Name",
			value: "model_name",
		},
		{
			label: "Model code",
			value: "model_code",
		},
		{
			label: "Engine",
			value: "engine",
		},
		{
			label: "Chassis",
			value: "chassi",
		},
		{
			label: "Plate",
			value: "registration_plate",
		},
		{
			label: "Color",
			value: "color",
		},
		{
			label: "Notes",
			value: "notes",
		},
		{
			label: "Category",
			value: "category",
		},
		{
			label: "Sale price",
			value: "sale_price",
		},
	];

	return (
		<div className="mt-5 container col-span-2 flex flex-col justify-between h-full">
			<div className="mb-5 font-extrabold flex justify-start items-center gap-2">
				1.
				<CSVLink data={csvHeaders} filename="import-inventory.csv">
					<Button className="flex  justify-between items-center gap-2 font-extrabold text-white p-2 rounded">
						<Download size={"1.2rem"} opacity={"60%"} />
						Download model
					</Button>
				</CSVLink>
			</div>

			<div className="flex flex-col gap-1 mb-5">
				<Label htmlFor="select-form" className="font-extrabold">
					2. Select storage
				</Label>
				<Select onValueChange={(value) => setSelectedStorage(parseInt(value))}>
					<SelectTrigger id="select-form" className="ml-4 w-[250px]">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						{storages.map((storage) => (
							<SelectItem key={storage.id} value={`${storage.id}`}>
								{storage.storage_name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex flex-col gap-1">
				<Label htmlFor="upload-form" className="font-extrabold">
					2. Upload file with data
				</Label>
				<Input
					accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
					id="upload-form"
					onChange={(e) => handleFileChoose(e)}
					className="ml-4 w-[250px]"
					type="file"
				/>
			</div>
			<Separator className="my-3" />

			<ScrollArea className="h-72">
				<Table>
					<TableCaption>List of products to import</TableCaption>
					<TableHeader>
						<TableRow>
							{bikeProperties.map((prop) => (
								<TableHead key={prop.value}>{prop.label}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{bikesImport.map((bike) => (
							<TableRow key={bike.id}>
								{bikeProperties.map((prop) => (
									//@ts-expect-error
									<TableCell key={prop.value}>{bike[prop.value]}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ScrollArea>

			<div className="container mt-5 flex justify-between">
				<Link href={"/inventory"}>
					<Button variant={"outline"}>Cancel</Button>
				</Link>
				<Button onClick={handleSubmitImport}>Import</Button>
			</div>
		</div>
	);
};

export default ImportForm;
