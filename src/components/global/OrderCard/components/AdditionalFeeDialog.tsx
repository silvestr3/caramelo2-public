import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderContext } from "@/context/OrderContext";
import { Plus } from "lucide-react";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { IAdditionalFee } from "@/types/AdditionalFee";

interface AdditionalFeeDialogProps {
	children: ReactNode;
	fee?: IAdditionalFee;
}

const AdditionalFeeDialog = ({ children, fee }: AdditionalFeeDialogProps) => {
	const { addAdditionalFee, editAdditionalFee } = useContext(OrderContext);
	const [description, setDescription] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);

	useEffect(() => {
		if (fee) {
			setDescription(fee.description);
			setAmount(fee.amount);
		}
	}, [fee]);

	const handleAddFee = () => {
		addAdditionalFee({
			description,
			amount,
		});

		setAmount(0);
		setDescription("");
	};

	const handleEditFee = () => {
		if (fee)
			editAdditionalFee({
				id: fee.id,
				description,
				amount,
			});

		setAmount(0);
		setDescription("");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{fee ? "Edit" : "Add new"} additional fee</DialogTitle>
					<DialogDescription>
						<div className="mt-2 flex justify-between">
							<div>
								<Label htmlFor="description">Description</Label>
								<Input
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									id="description"
								/>
							</div>

							<div>
								<Label htmlFor="description">Amount</Label>
								<Input
									value={amount}
									type="number"
									onChange={(e) => setAmount(parseFloat(e.target.value))}
									id="amount"
								/>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						{!fee ? (
							<Button onClick={handleAddFee}>Add</Button>
						) : (
							<Button onClick={handleEditFee}>Edit</Button>
						)}
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AdditionalFeeDialog;
