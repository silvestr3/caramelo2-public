"use client";

import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IBike } from "@/types/Bike";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getStorages } from "@/services/StorageService";
import { IStorage } from "@/types/Storage";
import { product_info } from "./ProductInfo";
import { price_info } from "./PriceInfo";
import { asOptionalField } from "@/util/ZodOptionalField";
import DateSelector from "./DateSelector";
import { createBike, editBike } from "@/services/InventoryService";
import { getDate } from "@/util/GetDateString";

const editBikeFormSchema = z.object({
	brand: z.string(),
	model_name: z.string(),
	model_code: z.string(),
	engine: z.string(),
	chassi: z.string(),
	registration_plate: z.string(),
	color: z.string(),
	notes: asOptionalField(z.string()),
	category: z.string(),
	wholesale_price: z.coerce.number(),
	wholesale_price_net: z.coerce.number(),
	sale_price: z.coerce.number(),
});

const createBikeFormSchema = z.object({
	brand: z.string().nonempty("Select brand"),
	model_name: z.string().nonempty("Model name is mandatory"),
	model_code: z.string().nonempty("Model code is mandatory"),
	engine: z.string().nonempty("Engine number is mandatory"),
	chassi: z.string().nonempty("Chassis number is mandatory"),
	registration_plate: asOptionalField(z.string()),
	color: asOptionalField(z.string()),
	notes: asOptionalField(z.string()),
	category: z.string(),
	storage_place: z.string().nonempty("Select storage place"),
	wholesale_price: asOptionalField(z.coerce.number()).default(0),
	wholesale_price_net: asOptionalField(z.coerce.number()).default(0),
	sale_price: z.coerce.number().default(0),
});

type createBikeFormData = z.infer<typeof createBikeFormSchema>;

interface BikeFormProps {
	storages?: IStorage[];
	bike?: IBike;
}

const BikeForm = ({ storages, bike }: BikeFormProps) => {
	const [selectedDate, setSelectedDate] = useState<Date>(
		bike ? new Date(bike.received_date) : new Date()
	);

	const form = useForm<createBikeFormData>({
		resolver: zodResolver(
			bike === undefined ? createBikeFormSchema : editBikeFormSchema
		),
	});

	const router = useRouter();

	useEffect(() => {
		if (bike !== undefined) {
			const blacklist = new Set();
			blacklist.add("id");
			blacklist.add("storage_place");
			blacklist.add("sold");
			blacklist.add("received_date");
			Object.keys(bike as IBike).forEach((field) => {
				if (!blacklist.has(field)) {
					// @ts-expect-error
					form.setValue(field, bike[field]);
				}
			});
		}
	}, [bike]);

	const onSubmit = async (values: any) => {
		let payload = {
			...values,
			received_date: selectedDate.toISOString().split("T")[0],
		};

		if (!bike) {
			// Create product form
			payload = {
				...payload,
				sold: false,
			};

			const req = await createBike(payload);
			if (req.status === "success") {
				toast.success(`Product ${values.model_name} created successfully`, {
					description: getDate(new Date()),
				});
				router.push("/inventory");
				return;
			}

			const error = await req.data;
			Object.keys(error).map((key) => {
				toast.error(`${key}: ${error[key][0]}`);
			});
			return;
		} else {
			//Edit product form
			const req = await editBike(bike.id, payload);
			if (req.status === "success") {
				toast.success(`Product ${values.model_name} edited successfully`, {
					description: getDate(new Date()),
				});
				router.push(`/inventory/${bike.id}`);
				return;
			}

			const error = await req.data;
			Object.keys(error).map((key) => {
				toast.error(`${key}: ${error[key][0]}`);
			});
			return;
		}
	};

	return (
		<Form {...form}>
			<form
				id="bikeform"
				onSubmit={form.handleSubmit(onSubmit)}
				className="col-span-2 grid grid-cols-2 mb-5"
			>
				<div className="mt-3 h-full">
					<h4 className="text-lg">Product information</h4>
					<div className="container flex flex-col  gap-2">
						{product_info.map((item) => (
							<FormField
								control={form.control}
								//@ts-expect-error
								name={item.name}
								render={({ field }) => (
									<FormItem className="flex items-center justify-between gap-5">
										<FormLabel>{item.label}</FormLabel>
										<FormControl className="max-w-[70%]">
											{item.options ? (
												<div className="flex flex-col w-full relative">
													<Select onValueChange={field.onChange}>
														<SelectTrigger>
															<SelectValue
																placeholder={`Select ${item.label}`}
															/>
														</SelectTrigger>
														<SelectContent>
															{item.options.map((option) => (
																<SelectItem value={option.value}>
																	{option.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage className="absolute -top-4 right-0" />
												</div>
											) : (
												<div className="flex flex-col w-full relative">
													<Input
														className="w-full placeholder:opacity-40"
														placeholder={item.placeholder}
														{...field}
													/>
													<FormMessage className="absolute -top-4 right-0" />
												</div>
											)}
										</FormControl>
									</FormItem>
								)}
							/>
						))}
					</div>
				</div>

				<div className="relative h-full">
					<Separator orientation="vertical" className="absolute h-full" />
					<div className="container mt-3 flex justify-between flex-col h-full">
						<h4 className="text-lg">Store information</h4>
						<div className="container flex flex-col  gap-2">
							<DateSelector date={selectedDate} setDate={setSelectedDate} />
							{price_info(storages).map((item) => (
								<FormField
									control={form.control}
									//@ts-expect-error
									name={item.name}
									render={({ field }) => (
										<FormItem className="flex items-center justify-between gap-10">
											<FormLabel>{item.label}</FormLabel>
											<FormControl className="max-w-[70%]">
												{item.options ? (
													<div className="flex flex-col w-full relative">
														<Select onValueChange={field.onChange}>
															<SelectTrigger className="max-w-full">
																<SelectValue
																	placeholder={`Select ${item.label}`}
																/>
															</SelectTrigger>
															<SelectContent>
																{item.options.map((option) => (
																	<SelectItem value={option.value}>
																		{option.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage className="absolute -top-4 right-0" />
													</div>
												) : (
													<div className="flex flex-col w-full relative">
														<Input
															className="w-full placeholder:opacity-40"
															placeholder={item.placeholder}
															type="number"
															{...field}
														/>
														<FormMessage className="absolute -top-4 right-0" />
													</div>
												)}
											</FormControl>
										</FormItem>
									)}
								/>
							))}
						</div>
						<div className="flex justify-between">
							<Button
								onClick={() => router.push("/inventory")}
								variant={"outline"}
								type="button"
							>
								Cancel
							</Button>
							<Button form="bikeform" type="submit">
								Submit
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default BikeForm;
