"use client";
import { FormField } from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { editOrder } from "@/services/OrderService";
import { IOrder } from "@/types/Order";
import { getDate } from "@/util/GetDateString";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormDataType {
	bikePrice: number;
	paymentMethod: string;
	notes: string;
	additionalFees: { id: number; description: string; amount: number }[];
	discount: number;
	downPayment: number;
}

interface EditFormProps {
	order: IOrder;
}

const EditForm = ({ order }: EditFormProps) => {
	const orderBike = order.bikes[0];
	const { register, control, handleSubmit, formState, getValues } =
		useForm<FormDataType>({
			defaultValues: {
				bikePrice: parseFloat(orderBike.sale_price),
				paymentMethod: order.payment_method,
				notes: order.notes,
				additionalFees: order.additional_fees,
				discount: order.discount,
				downPayment: order.down_payment,
			},
		});

	const { fields, append, remove } = useFieldArray({
		name: "additionalFees",
		control,
	});

	const [total, setTotal] = useState<number>(order.total);

	const calculateTotal = () => {
		// @ts-expect-error
		const bikePrice = parseFloat(getValues("bikePrice"));
		// @ts-expect-error
		const discount = parseFloat(getValues("discount"));

		let fees_total = 0;
		getValues("additionalFees").map((fee) => {
			// @ts-expect-error
			fees_total += parseFloat(fee.amount);
		});

		const total = bikePrice + fees_total - discount;
		setTotal(total);
	};

	const router = useRouter();

	const submitForm = async (data: FormDataType) => {
		calculateTotal();
		const payload = { ...data, total };
		const edit = await editOrder(order.id, payload);

		if (edit.status === "success") {
			toast.success("Order modified successfully", {
				description: getDate(new Date()),
			});

			router.push(`/sales/${order.id}`);
			return;
		}

		toast.error("Error on editing the order", {
			description: getDate(new Date()),
		});
		return;
	};

	return (
		<>
			<form id="editorder" onSubmit={handleSubmit(submitForm)}>
				<div className="flex items-center justify-between hover:bg-slate-100 p-2 rounded">
					<span>Payment method</span>
					<FormField
						control={control}
						name="paymentMethod"
						render={({ field }) => {
							return (
								<Select onValueChange={field.onChange}>
									<SelectTrigger className="border-none text-xs p-2 w-[40%] bg-slate-200 focus:ring-0 rounded">
										<SelectValue placeholder={field.value} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="เงินสด">เงินสด</SelectItem>
										<SelectItem value="ไฟแนนซ์">ไฟแนนซ์</SelectItem>
										<SelectItem value="ผ่อนกับร้าน">ผ่อนกับร้าน</SelectItem>
									</SelectContent>
								</Select>
							);
						}}
					/>
				</div>

				<div className="flex items-center justify-between hover:bg-slate-100 p-2 rounded">
					<span>Notes</span>
					<input
						type="text"
						className="border-none text-xs p-2 bg-slate-200 focus:ring-0 rounded"
						{...register("notes")}
					/>
				</div>

				<div className="flex flex-col gap-1 p-2 rounded">
					<span>Product</span>
					<div className="flex group justify-between items-center bg-slate-100 hover:bg-slate-200 p-2 rounded">
						<div className="flex flex-col">
							<span>{orderBike.model_name}</span>
							<span className="text-xs">{orderBike.model_code}</span>
						</div>

						<input
							type="number"
							className="border-none text-xs p-2 bg-slate-200 focus:ring-0 rounded"
							{...register("bikePrice", {
								onChange: calculateTotal,
							})}
						/>
					</div>
				</div>

				<div className="flex flex-col p-2 rounded">
					<div className="flex items-center justify-start p-2 gap-2">
						<span>Additional fees</span>
						<button
							type="button"
							onClick={() =>
								append({
									id: Math.floor(Math.random() * 1000),
									description: "",
									amount: 0,
								})
							}
							className="border rounded shadow-sm hover:scale-110 bg-slate-300 "
						>
							<Plus opacity={"60%"} size={16} />
						</button>
					</div>
					<div className="max-h-40 min-h-40 overflow-y-auto">
						{fields.map((field, index) => (
							<div
								className="flex group justify-between items-center bg-slate-100 hover:bg-slate-200 p-2 rounded"
								key={field.id}
							>
								<input
									type="text"
									className="border-none text-xs p-2 bg-slate-200 focus:ring-0 rounded"
									{...register(`additionalFees.${index}.description`)}
								/>

								<input
									type="number"
									className="border-none text-xs p-2 bg-slate-200 focus:ring-0 rounded"
									{...register(`additionalFees.${index}.amount`, {
										onChange: calculateTotal,
									})}
								/>
								<button
									onClick={() => {
										calculateTotal();
										remove(index);
									}}
									className="bg-slate-300 order rounded shadow-sm hover:scale-110"
								>
									<X opacity={"60%"} size={18} />
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-1 p-2 rounded">
					<div className="flex group justify-between items-center  hover:bg-slate-100 p-2 rounded">
						<div className="flex flex-col">
							<span>Discount</span>
						</div>

						<input
							type="number"
							className="border-none text-xs p-2 bg-slate-200 focus:ring-0 rounded"
							{...register("discount", {
								onChange: calculateTotal,
							})}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1 p-2 rounded">
					<div className="flex group justify-between items-center  hover:bg-slate-100 p-2 rounded">
						<div className="flex flex-col">
							<span>Down payment</span>
						</div>

						<input
							type="number"
							className="border-none text-xs p-2 bg-slate-200 focus:ring-0 rounded"
							{...register("downPayment", {
								onChange: calculateTotal,
							})}
						/>
					</div>
				</div>
				<hr />
				<div className="flex flex-col">
					<div className="flex justify-between hover:bg-slate-100 p-2 rounded ">
						<span>Total</span>
						<span>{total}</span>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditForm;
