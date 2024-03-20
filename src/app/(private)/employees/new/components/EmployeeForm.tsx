"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IEmployee } from "@/types/IEmployee";
import { createEmployee, editEmployee } from "@/services/EmployeeService";
import { getDate } from "@/util/GetDateString";
import { asOptionalField } from "@/util/ZodOptionalField";

const EditFormSchema = z
	.object({
		name: z.string().nonempty("Name is mandatory"),
		username: z.string().nonempty("Username is mandatory"),
		password: asOptionalField(z.coerce.string()),
		repeat_password: asOptionalField(z.coerce.string()),
		role: z.string(),
	})
	.refine((data) => data.password === data.repeat_password, {
		message: "Passwords don't match",
		path: ["repeat_password"],
	});

const CreateFormSchema = z
	.object({
		name: z.string().nonempty("Name is mandatory"),
		username: z.string().nonempty("Username is mandatory"),
		password: z.string().nonempty("Password is mandatory"),
		repeat_password: z.string().nonempty("Repeat password"),
		role: z.string(),
	})
	.refine((data) => data.password === data.repeat_password, {
		message: "Passwords don't match",
		path: ["repeat_password"],
	});

interface EmployeeFormProps {
	employee?: IEmployee;
}

type FormDataType = {
	name: string;
	username: string;
	password?: string;
	repeat_password?: string;
	role: "adm" | "emp";
};

const EmployeeForm = ({ employee }: EmployeeFormProps) => {
	const form = useForm<FormDataType>({
		defaultValues: {
			name: employee?.name,
			username: employee?.username,
			role: employee?.role || "emp",
			password: "",
			repeat_password: "",
		},
		resolver: zodResolver(!employee ? CreateFormSchema : EditFormSchema),
	});

	const router = useRouter();

	const onSubmit = async (values: any) => {
		let payload = {
			...values,
		};

		if (!employee) {
			// Create employee form
			const req = await createEmployee(payload);
			if (req.status === "success") {
				toast.success(`Employee ${values.name} created successfully`, {
					description: getDate(new Date()),
				});
				router.push("/employees");
				return;
			}

			const error = await req.data;
			toast.error(error.message);
			return;
		} else {
			//Edit employee form
			const req = await editEmployee(employee.id!, payload);
			if (req.status === "success") {
				toast.success(`Employee ${values.name} edited successfully`, {
					description: getDate(new Date()),
				});
				router.push(`/employees/${employee.id}`);
				return;
			}

			const error = await req.data;
			toast.error(error.message);
			return;
		}
	};

	const employee_info = () => {
		let properties = [
			{
				label: "Employee name",
				name: "name",
				placeholder: "Employee name",
			},
			{
				label: "Username",
				name: "username",
				placeholder: "Username (to be used for login)",
			},
			{
				label: "Password",
				name: "password",
				placeholder: "Password",
			},
			{
				label: "Repeat password",
				name: "repeat_password",
				placeholder: "Repeat password",
			},
			{
				label: "Role",
				name: "role",
				placeholder: "Role",
				options: [
					{ value: "emp", label: "Employee" },
					{ value: "adm", label: "Admin" },
				],
			},
		];

		return properties;
	};

	return (
		<Form {...form}>
			<form
				id="employeeform"
				onSubmit={form.handleSubmit(onSubmit)}
				className="col-span-2 gridmb-5"
			>
				<div className="mt-3 h-full">
					<div className="container flex flex-col mt-3  gap-2">
						{employee_info().map((item) => (
							<FormField
								key={item.name}
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
																<SelectItem
																	key={option.value}
																	value={option.value}
																>
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
														type={
															item.name.includes("password")
																? "password"
																: "text"
														}
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
						<div className="flex justify-between mt-5">
							<Button
								onClick={() => router.push("/employees")}
								variant={"outline"}
								type="button"
							>
								Cancel
							</Button>
							<Button form="employeeform" type="submit">
								Submit
							</Button>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
};

export default EmployeeForm;
