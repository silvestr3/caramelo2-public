"use client";

import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICustomer } from "@/types/Customer";
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

import { customer_info } from "./CustomerInfo";
import { address_info } from "./AddressInfo";
import DateSelector from "./DateSelector";
import { createCustomer, editCustomer } from "@/services/CustomerService";
import { getDate } from "@/util/GetDateString";

const customerFormSchema = z.object({
	name: z.string().nonempty("Name is mandatory"),
	id_card_number: z.string(),
	age: z.coerce.number(),
	address: z.string().nonempty("Address is mandatory"),
	district: z.string(),
	subdistrict: z.string(),
	province: z.string(),
	gender: z.string(),
	phone: z.string().nonempty("Phone is mandatory"),
});

type customerFormData = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
	customer?: ICustomer;
}

const CustomerForm = ({ customer }: CustomerFormProps) => {
	const [selectedDate, setSelectedDate] = useState<Date>(
		customer ? new Date(customer.dob) : new Date()
	);

	const form = useForm<customerFormData>({
		resolver: zodResolver(customerFormSchema),
	});

	const router = useRouter();

	useEffect(() => {
		if (customer !== undefined) {
			Object.keys(customer as ICustomer).forEach((field) => {
				if (field !== "id") {
					// @ts-expect-error
					setValue(field, props.customer[field]);
				}
			});
		}
	}, [customer]);

	const onSubmit = async (values: any) => {
		let payload = {
			...values,
			dob: selectedDate.toISOString().split("T")[0],
		};

		if (!customer) {
			// Create customer form
			const req = await createCustomer(payload);
			if (req.status === "success") {
				toast.success(`Customer ${values.name} created successfully`, {
					description: getDate(new Date()),
				});
				router.push("/customers");
				return;
			}

			const error = await req.data;
			Object.keys(error).map((key) => {
				toast.error(`${key}: ${error[key][0]}`);
			});
			return;
		} else {
			//Edit customer form
			const req = await editCustomer(customer.id, payload);
			if (req.status === "success") {
				toast.success(`Customer ${values.name} edited successfully`, {
					description: getDate(new Date()),
				});
				router.push(`/customers/${customer.id}`);
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
				id="customerform"
				onSubmit={form.handleSubmit(onSubmit)}
				className="col-span-2 grid grid-cols-2 mb-5"
			>
				<div className="mt-3 h-full">
					<h4 className="text-lg">Customer information</h4>
					<div className="container flex flex-col mt-3  gap-2">
						<DateSelector date={selectedDate} setDate={setSelectedDate} />
						{customer_info.map((item) => (
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
						<h4 className="text-lg flex items-center gap-2">
							Address information
						</h4>
						<div className="container flex flex-col  gap-2">
							{address_info.map((item) => (
								<FormField
									control={form.control}
									//@ts-expect-error
									name={item.name}
									render={({ field }) => (
										<FormItem className="flex items-center justify-between gap-10">
											<FormLabel>{item.label}</FormLabel>
											<FormControl className="max-w-[70%]">
												<div className="flex flex-col w-full relative">
													<Input
														className="w-full placeholder:opacity-40"
														placeholder={item.placeholder}
														{...field}
													/>
													<FormMessage className="absolute -top-4 right-0" />
												</div>
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
							<Button form="customerform" type="submit">
								Submit
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default CustomerForm;
