import { IBike } from "@/types/Bike";
import { OrderContext } from "@/context/OrderContext";
import { Pencil, X } from "lucide-react";
import { useContext } from "react";

interface OrderBikeProps {
	bike: IBike;
}

const OrderBike = ({ bike }: OrderBikeProps) => {
	const { removeBikeFromOrder } = useContext(OrderContext);

	const remove = () => {
		removeBikeFromOrder();
	};

	return (
		<div className="shadow group p-3 mt-3 rounded-lg h-20 bg-slate-700 font-extrabold text-slate-50">
			<div className="flex rounded-lg justify-between">
				<div className="flex flex-col items-start justify-start">
					<span>{bike.model_name}</span>
					<span className="text-xs">{bike.model_code}</span>
				</div>

				<span>฿ {bike.sale_price}</span>
			</div>
			<div className="w-full justify-end items-center gap-1 flex">
				<div
					onClick={remove}
					className="bg-slate-200 rounded h-5 w-5 flex items-center justify-center hover:cursor-pointer hover:scale-110 hover:rounded-sm"
				>
					<X size={14} className="text-slate-900" />
				</div>
				<div className="bg-slate-200 rounded h-5 w-5 flex items-center justify-center hover:cursor-pointer hover:scale-110 hover:rounded-sm">
					<Pencil size={14} className="text-slate-900" />
				</div>
			</div>
		</div>
	);
};

export default OrderBike;
