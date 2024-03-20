import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { OrderContext } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { IBike } from "@/types/Bike";
import ProductBadge from "./ProductBadge";

const BikeRowBadge = ({ bike }: { bike: IBike }) => {
	const { orderBike } = useContext(OrderContext);

	if (bike.sold) {
		return <ProductBadge type="sold" />;
	}

	if (orderBike?.id === bike.id) {
		return <ProductBadge type="order" />;
	}

	return <ProductBadge type="available" />;
};

export default BikeRowBadge;
