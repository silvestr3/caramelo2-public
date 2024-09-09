"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Gift } from "@/types/Gift";
import GiftRowButton from "./GiftRowButton";

export const GiftColumns: ColumnDef<Gift>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Amount in stock",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const gift = row.original;

      return <GiftRowButton gift={gift} />;
    },
  },
];
